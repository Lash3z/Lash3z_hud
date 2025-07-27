
# Quick Deploy Guide for LASH3Z HUD

This guide explains how to use the `deploy.bat` script and basic GitHub commands for updating your HUD project.

---

## Using `deploy.bat` (One-Click Deployment)
1. Place `deploy.bat` in your **LASH3Z_HUD_GitHub_Ready** folder.
2. Double-click `deploy.bat`:
   - It stages (`git add .`) all changed files.
   - Commits them with a timestamp.
   - Pushes them to your `main` branch on GitHub.
3. Wait for the `[SUCCESS] HUD changes deployed to GitHub.` message.

---

## Common Git Commands (Manual Deployment)
- **Stage changes**  
  ```bash
  git add .
  ```
- **Commit with a message**  
  ```bash
  git commit -m "Your message here"
  ```
- **Push to GitHub**  
  ```bash
  git push origin main
  ```

---

## GitHub Pages
1. Go to **Settings > Pages** in your GitHub repository.
2. Under **Source**, select:
   - **Branch:** main
   - **Folder:** / (root)
3. Your HUD will be live at:
   ```
   https://<your-username>.github.io/lash3z_hud/
   ```

---

## Tips
- Always run `deploy.bat` after making updates.
- Use `git pull` if you update files directly on GitHub and want to sync your local folder:
  ```bash
  git pull origin main
  ```
