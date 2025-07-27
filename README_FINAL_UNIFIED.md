# LASH3Z HUD - Final Unified Leaderboard Build (Day 50–75)

## Overview
This final build merges **all features from Day 50–75**, including:
- Unified leaderboard backend (Lucky 7, Hunts, Tournaments).
- Admin panel and CRUD operations.
- Google Sheets sync.
- HUD leaderboard with animations, filters, and glow effects.
- Chart.js visualization (bar + line charts).
- Toggle controls for charts and historical data tracking.

## Main Features
1. **Unified API** (`/api/leaderboard/overall`) for combined data.
2. **Filter Tabs** (Overall, Hunts, Tournaments, Lucky 7).
3. **Animated Score Updates** (increment counters, glow effects).
4. **Historical Tracking** (multi-day point progression).
5. **Bar/Line Chart with Toggle and Smooth Transitions**.

## How to Run
1. **Install dependencies:**
   ```bash
   cd Admin/backend
   npm install
   ```
2. **Start backend server:**
   ```bash
   node server.js
   ```
3. **Open** `HUD/unified_leaderboard.html` in your browser.

## Next Steps (Optional)
- Add export-to-CSV for historical data.
- Merge all modules (games, forms, leaderboard) into one HUD panel.

---
This is the **final combined unified leaderboard package.**
