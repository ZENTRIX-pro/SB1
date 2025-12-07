# Project Import Setup - ZENTRIX E-Commerce

## Current Status
Setting up a GitHub import of ZENTRIX luxury e-commerce website to run in Replit environment.

## Completed
1. ✅ Installed Node.js 20
2. ✅ Installed npm dependencies successfully (479 packages)
3. ✅ Verified vite.config.ts already has correct configuration:
   - `host: "0.0.0.0"` ✓
   - `allowedHosts: true` ✓
   - Port will be 5000 (configured in server/index.ts)

## Project Structure
- **Location**: All code is in the `IP/` directory
- **Type**: Full-stack React + Express application
- **Frontend**: React with Vite, TailwindCSS, shadcn/ui components
- **Backend**: Express server with in-memory storage
- **Database**: Has drizzle config but currently using in-memory storage (MemStorage class)
- **Package manager**: npm
- **Dev command**: `npm run dev` (runs `NODE_ENV=development tsx server/index.ts`)
- **Port**: 5000 (configured in server/index.ts, listens on 0.0.0.0)

## Next Steps (From Task List)
1. Setup workflow to run dev server on port 5000
2. Start workflow and verify console logs
3. Configure deployment settings
4. Mark project import as complete

## Important Notes
- The vite config is already correctly configured for Replit proxy
- Server already binds to 0.0.0.0:5000 (correct for frontend)
- No backend port conflict - this is a single server serving both frontend and backend
- LSP errors exist but are expected until workflow runs (types will resolve)
- No database setup needed - using in-memory storage currently
- Working directory: IP/

## Task List ID Reference
- Task 1: Install deps (COMPLETED)
- Task 2: Verify vite config (IN_PROGRESS - needs completion)
- Task 3: Setup workflow
- Task 4: Verify logs
- Task 5: Configure deployment
- Task 6: Mark complete
