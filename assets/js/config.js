
// Centralised config so you only change IDs once
window.LASH3Z_CONFIG = {
  sheets: {
    mega_hunt: 'https://docs.google.com/spreadsheets/d/e/DUMMY_ID_MEGA/pub?gid=0&single=true&output=csv',
    super_hunt: 'https://docs.google.com/spreadsheets/d/e/DUMMY_ID_SUPER/pub?gid=0&single=true&output=csv',
    player_hunt: 'https://docs.google.com/spreadsheets/d/e/DUMMY_ID_PLAYER/pub?gid=0&single=true&output=csv',
    tournament: 'https://docs.google.com/spreadsheets/d/e/DUMMY_ID_TOURNAMENT/pub?gid=0&single=true&output=csv',
    lucky7: 'https://docs.google.com/spreadsheets/d/e/DUMMY_ID_LUCKY7/pub?gid=0&single=true&output=csv',
    leaderboard: 'https://docs.google.com/spreadsheets/d/e/DUMMY_ID_MASTER/pub?gid=0&single=true&output=csv'
  },
  // If you do NOT want Apps Script, leave this null and handle manual sheet edits
  apps_script_exec: 'https://script.google.com/macros/s/DUMMY_SCRIPT_ID/exec'
};
