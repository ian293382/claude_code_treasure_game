# Deploy to Vercel

Deploy the `claude_code_treasure_game` React/Vite project to Vercel.

## Steps

1. **Check Vercel CLI is installed**
   ```bash
   vercel --version
   ```
   If not installed, run: `npm install -g vercel`

2. **Run production build to verify it compiles**
   ```bash
   cd /home/ian/claude_code_treasure_game && npm run build
   ```
   Fix any build errors before proceeding.

3. **Deploy to Vercel**
   - For a preview deployment:
     ```bash
     cd /home/ian/claude_code_treasure_game && vercel
     ```
   - For a production deployment:
     ```bash
     cd /home/ian/claude_code_treasure_game && vercel --prod
     ```

4. **Verify deployment**
   - Check the URL returned by the Vercel CLI.
   - Confirm the app loads and the game is functional.

## Notes

- **Framework**: React + Vite — Vercel auto-detects this. Build command: `vite build`, output dir: `dist`.
- **Server**: The project has a Node.js server (`server/index.js`) run via `npm run server`. If backend routes are needed in production, configure Vercel serverless functions or a separate backend deployment.
- **Environment variables**: Set any required env vars in the Vercel dashboard or via `vercel env add`.
- **First-time setup**: Run `vercel login` and link the project with `vercel link` before deploying.
