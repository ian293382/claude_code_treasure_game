# Deploy to GitHub Pages

Deploy the `claude_code_treasure_game` React/Vite project to GitHub Pages.

## Steps

1. **Check remote is set to the correct GitHub repository**
   ```bash
   git remote -v
   ```
   If wrong, update it:
   ```bash
   git remote set-url origin https://github.com/ian293382/claude_code_treasure_game.git
   ```

2. **Ensure `vite.config.ts` has the correct base path**
   The `base` field must match the repository name:
   ```ts
   base: '/claude_code_treasure_game/',
   ```

3. **Stage, commit, and push all changes to `main`**
   ```bash
   git config commit.gpgsign false
   git add .
   git commit -m "your commit message"
   git push -u origin main
   ```

4. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```
   This runs `predeploy` (builds the project) then publishes the `build/` folder to the `gh-pages` branch.

5. **Enable GitHub Pages in repo settings (first time only)**
   - Go to: https://github.com/ian293382/claude_code_treasure_game/settings/pages
   - Source: **Deploy from a branch**
   - Branch: **`gh-pages`** / `/ (root)`
   - Click **Save**

6. **Verify deployment**
   Visit: **https://ian293382.github.io/claude_code_treasure_game/**
   Allow 1–2 minutes for GitHub Pages to propagate on first deploy.

## Notes

- **Framework**: React + Vite. Build output goes to `build/` (configured in `vite.config.ts`).
- **Deploy script**: Uses `gh-pages` npm package (`npm run deploy`). Install with `npm install --save-dev gh-pages` if missing.
- **GPG signing**: If `gh-pages` fails with a GPG error, disable signing: `git config --global commit.gpgsign false`
- **Backend**: The Express/SQLite server (`server/index.js`) is NOT deployed to GitHub Pages. Auth and score history features will not work on the GitHub Pages URL.
- **Re-deploy**: Any time you make changes, run `npm run deploy` again to update the live site.
