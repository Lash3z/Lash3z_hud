
// Google Sheets Integration Demo
async function fetchLeaderboardData() {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-PLACEHOLDER/pub?gid=0&single=true&output=csv'; // Replace with published sheet URL
    try {
        const response = await fetch(url);
        const text = await response.text();
        const rows = text.split('\n').map(r => r.split(','));
        renderLeaderboard(rows);
    } catch (error) {
        console.error('Error fetching Google Sheet:', error);
    }
}

function renderLeaderboard(data) {
    const table = document.getElementById('leaderboard-table-body');
    if (!table) return;
    table.innerHTML = '';
    for (let i = 1; i < data.length; i++) { // Skip header row
        const row = data[i];
        if (row.length < 5) continue;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td>`;
        table.appendChild(tr);
    }
}

window.onload = () => {
    if (document.getElementById('leaderboard-table-body')) {
        fetchLeaderboardData();
    }
}
