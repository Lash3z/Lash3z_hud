
# LASH3Z HUD Final Release (Day 20)

## Overview
This build includes:
- Mega Hunt, Super Hunt, Player Hunt modules.
- Tournament and Lucky 7 tracking with Google Sheets integration.
- Admin Panel with PIN protection (2323) and live LASH3ZBux management.
- Leaderboard synced with Google Sheets (auto-refresh & sorting).
- Fully styled neon-themed UI with optimized performance.

## Setup Instructions
1. **Google Sheets**
   - Publish each sheet (Mega, Super, Player Hunt, Tournament, Lucky 7, Master Leaderboard).
   - Update URLs in `modules/bonus_hunt.html`, `tournament.html`, etc.

2. **Google Apps Script**
   - Deploy a script endpoint to handle write-backs (Admin Panel).
   - Replace `APPS_SCRIPT_URL` in `modules/admin.html` with your script URL.

3. **Local Hosting**
   - Run with a local server (e.g., `npx serve`) to test.

4. **Customization**
   - Place your images and videos inside `assets/images/` and `assets/videos/`.
   - All placeholders are pre-configured for easy plug-in.

## Features
- **Neon Sidebar Navigation** (collapsible sections).
- **Prediction Forms** with glowing buttons.
- **Charts** (Google Charts) for Bonus Hunts, Tournament stats, Lucky 7 points.
- **Daily/Monthly Reset** buttons for leaderboard management.
- **Loading Spinners** and performance timers for debugging.

## PIN Code
- Admin Panel PIN: **2323**.

## Final Notes
- Ready for GitHub deployment.
- Can be extended with Kick/Discord integrations in the future.


## Deployment on GitHub Pages
1. Push this repository to your GitHub account.
2. In **Settings > Pages**, select the main branch and `/root` folder.
3. Your HUD will be accessible via GitHub Pages.

## Notes
- Ensure all Google Sheets and Apps Script URLs are updated in `modules/*`.
- Use the `assets/` folder for branding images, logos, and videos.
