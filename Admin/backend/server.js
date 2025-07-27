const fs = require('fs');
const path = require('path');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const settingsFile = path.join(__dirname, 'admin_settings.json');

app.use(express.json());

// REST API
app.get('/api/settings', (req, res) => {
  const data = fs.readFileSync(settingsFile);
  res.json(JSON.parse(data));
});

app.post('/api/settings', (req, res) => {
  fs.writeFileSync(settingsFile, JSON.stringify(req.body, null, 2));
  broadcastSettings(req.body);
  res.json({ success: true });
});


// Lucky 7 Score Update
app.post('/api/lucky7', (req, res) => {
  const data = JSON.parse(fs.readFileSync(settingsFile));
  data.lucky7Score = req.body.lucky7Score || 0;
  fs.writeFileSync(settingsFile, JSON.stringify(data, null, 2));
  broadcastLucky7(data.lucky7Score);
  res.json({ success: true, score: data.lucky7Score });
});

function broadcastLucky7(score) {
  const msg = JSON.stringify({ type: 'lucky7_update', score });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}


// Lucky 7 Leaderboard Data
const leaderboardData = [
  { username: 'Player1', score: 50 },
  { username: 'Player2', score: 42 },
  { username: 'Player3', score: 35 }
];

app.get('/api/lucky7/leaderboard', (req, res) => {
  res.json(leaderboardData);
});

app.post('/api/lucky7/add', (req, res) => {
  const { username, score } = req.body;
  leaderboardData.push({ username, score });
  res.json({ success: true, leaderboard: leaderboardData });
});


// Lucky 7 CRUD Operations
app.post('/api/lucky7/update', (req, res) => {
  const { index, username, score } = req.body;
  if (leaderboardData[index]) {
    leaderboardData[index].username = username;
    leaderboardData[index].score = score;
    res.json({ success: true, leaderboard: leaderboardData });
  } else {
    res.status(404).json({ error: 'Player not found' });
  }
});

app.post('/api/lucky7/delete', (req, res) => {
  const { index } = req.body;
  if (leaderboardData[index]) {
    leaderboardData.splice(index, 1);
    res.json({ success: true, leaderboard: leaderboardData });
  } else {
    res.status(404).json({ error: 'Player not found' });
  }
});


// Google Sheets Sync Integration
import { syncLeaderboardToSheet, fetchLeaderboardFromSheet } from './googleSheetsSync.js';

// Sync leaderboard with Sheets on update or delete
async function saveAndSync() {
  await syncLeaderboardToSheet(leaderboardData);
}

// Replace GET endpoint to optionally fetch from Sheets
app.get('/api/lucky7/leaderboard', async (req, res) => {
  try {
    const sheetData = await fetchLeaderboardFromSheet();
    if (sheetData.length > 0) {
      leaderboardData.length = 0;
      leaderboardData.push(...sheetData);
    }
    res.json(leaderboardData);
  } catch (err) {
    console.error('Error fetching from Google Sheets:', err);
    res.json(leaderboardData);
  }
});

// Update existing CRUD endpoints
app.post('/api/lucky7/add', async (req, res) => {
  const { username, score } = req.body;
  leaderboardData.push({ username, score });
  await saveAndSync();
  res.json({ success: true, leaderboard: leaderboardData });
});

app.post('/api/lucky7/update', async (req, res) => {
  const { index, username, score } = req.body;
  if (leaderboardData[index]) {
    leaderboardData[index].username = username;
    leaderboardData[index].score = score;
    await saveAndSync();
    res.json({ success: true, leaderboard: leaderboardData });
  } else {
    res.status(404).json({ error: 'Player not found' });
  }
});

app.post('/api/lucky7/delete', async (req, res) => {
  const { index } = req.body;
  if (leaderboardData[index]) {
    leaderboardData.splice(index, 1);
    await saveAndSync();
    res.json({ success: true, leaderboard: leaderboardData });
  } else {
    res.status(404).json({ error: 'Player not found' });
  }
});


// Unified Leaderboard Endpoint
import { getUnifiedLeaderboard } from './unifiedAggregator.js';

app.get('/api/leaderboard/overall', (req, res) => {
  const unified = getUnifiedLeaderboard();
  res.json(unified);
});

// WebSocket broadcast function
function broadcastSettings(settings) {
  const msg = JSON.stringify({ type: 'update', settings });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

// WebSocket connection
wss.on('connection', ws => {
  console.log('Client connected to WebSocket');
  const data = fs.readFileSync(settingsFile);
  ws.send(JSON.stringify({ type: 'init', settings: JSON.parse(data) }));
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Admin backend with WebSocket running on port ${PORT}`);
});
