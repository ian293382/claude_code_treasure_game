Deploy the claude_code_treasure_game React/Vite project to Vercel.

Follow these steps:

1. Check Vercel CLI is installed by running `vercel --version`. If missing, install it with `npm install -g vercel`.

2. Run `npm run build` in /home/ian/claude_code_treasure_game to confirm the production build succeeds. Fix any errors before continuing.

3. Ask the user whether this is a **preview** or **production** deploy:
   - Preview: `vercel`
   - Production: `vercel --prod`

4. Run the deploy command from /home/ian/claude_code_treasure_game and report the deployment URL back to the user.

## Project details
- Framework: React + Vite (auto-detected by Vercel)
- Build command: `vite build`
- Output directory: `dist`
- Node server: `server/index.js` (not deployed to Vercel — advise user if backend routes are needed)

## Prerequisites (first time only)
- `vercel login` — authenticate with Vercel
- `vercel link` — link this directory to a Vercel project
- Set any environment variables via `vercel env add` or the Vercel dashboard
