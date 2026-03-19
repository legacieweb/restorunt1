# Deployment Guide for Restaurant App to Render

This guide will walk you through deploying the full-stack restaurant application to Render using the provided `render.yaml` file.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. Your code pushed to a GitHub, GitLab, or Bitbucket repository
3. Basic understanding of environment variables

## Step-by-Step Deployment

### Option 1: Using Render Blueprint (Recommended)

1. **Push your code** to a Git repository (including the `render.yaml` file we created)
2. In your Render dashboard:
   - Click "New" → "Blueprint from YAML"
   - Connect your GitHub/GitLab/Bitbucket account
   - Select your repository
   - Render will automatically detect the `render.yaml` file
   - Click "Create Blueprint"
3. Render will:
   - Create a PostgreSQL database (restaurant-db)
   - Deploy the backend service (from ./backend)
   - Deploy the frontend service (from ./frontend)
4. After deployment, you'll need to:
   - Add any missing environment variables (see below)
   - Trigger a redeploy if necessary

### Option 2: Manual Service Creation

If you prefer to create services manually:

#### Backend Service
1. Create a new Web Service
2. Repository: Your restaurant-app repo
3. Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Environment Variables:
   - `DATABASE_URL`: Will be set automatically when you add the database
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - Add any other variables from your `backend/.env` (except secrets which you'll add separately)

#### Frontend Service
1. Create a new Web Service
2. Repository: Your restaurant-app repo
3. Root Directory: `frontend`
4. Build Command: `npm install && npm run build`
5. Start Command: `npx serve -s dist`
6. Environment Variables:
   - `NODE_ENV`: `production`
   - `VITE_BACKEND_URL`: Set to your backend service URL (e.g., `https://backend.onrender.com`)

#### Database
1. Create a new PostgreSQL database
2. Name: `restaurant-db` (or match what's in render.yaml)
3. Plan: Free
4. Once created, note the internal database URL and add it as `DATABASE_URL` to your backend service

## Environment Variables

### Backend (.env equivalents)
Check your `backend/.env` file for variables you need to set in Render:
- `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_DATABASE` (if not using DATABASE_URL)
- `JWT_SECRET`
- `EMAIL_SERVICE`, `EMAIL_USER`, `EMAIL_PASS` (for email functionality)
- Any other custom variables

### Frontend
- `VITE_BACKEND_URL`: The URL of your deployed backend service

## Important Notes

1. **Security**: Never commit sensitive environment variables to your repository. Add them in Render's environment variables section.
2. **Database**: The free tier PostgreSQL on Render has limitations but is sufficient for development and small production apps.
3. **Build Paths**: The frontend build output goes to `dist` (as configured in Vite), which is served by `serve`.
4. **CORS**: Ensure your backend CORS configuration allows requests from your frontend domain.
5. **Initial Data**: You may need to run the seed script after deployment to populate initial data:
   ```bash
   # You can run this via Render's shell access or add a temporary endpoint
   node seed.js
   ```

## Troubleshooting

1. **Backend fails to start**: Check logs for database connection errors
2. **Frontend shows blank page**: Verify `VITE_BACKEND_URL` is correct and backend is reachable
3. **Build failures**: Ensure you have the correct Node.js version (Render uses 18.x by default)
4. **Database connection**: Make sure the backend service is linked to the database (if using Blueprint, this is automatic)

## Post-Deployment

1. Test your deployed application at the frontend URL
2. Verify API endpoints are working (e.g., `https://your-backend.onrender.com/api/health`)
3. Set up custom domains if desired (in Render dashboard)
4. Enable automatic deploys from your Git repository

## Render.yaml Explanation

The `render.yaml` file defines:
- Two web services: `backend` and `frontend`
- One PostgreSQL database: `restaurant-db`
- Automatic linking of database to backend via `DATABASE_URL`
- Build and start commands for each service
- Environment variable configuration

For more information, see Render's documentation: https://render.com/docs/yaml