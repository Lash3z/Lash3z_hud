// Google Sheets Sync for Lucky 7 Leaderboard
import fetch from 'node-fetch';

const SHEET_API_URL = 'https://script.google.com/macros/s/REPLACE_WITH_SCRIPT_ID/exec';

export async function syncLeaderboardToSheet(leaderboardData) {
  try {
    const res = await fetch(SHEET_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'updateLeaderboard', data: leaderboardData })
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to sync with Google Sheets:', err);
  }
}

export async function fetchLeaderboardFromSheet() {
  try {
    const res = await fetch(SHEET_API_URL + '?action=getLeaderboard');
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch leaderboard from Google Sheets:', err);
    return [];
  }
}
