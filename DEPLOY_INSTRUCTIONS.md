# 🚀 Vercel Deployment Guide - MB45 Furniture E-commerce

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **MongoDB Atlas**: Database configured and accessible
4. **Environment Variables**: Prepared for both projects

## 🔧 Backend Deployment (Server)

### Step 1: Prepare Backend Environment Variables

Create a `.env` file in the `server/` directory with these variables:

```env
# Database
MONGO_URI=your_mongodb_atlas_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary (if using image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Node Environment
NODE_ENV=production
```

### Step 2: Deploy Backend to Vercel

1. **Go to Vercel Dashboard**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - **Framework Preset**: `Node.js`
   - **Root Directory**: `server`
   - **Build Command**: `npm run build` (or leave empty if no build step)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables** in Vercel:
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env` file

6. **Deploy**

### Step 3: Get Backend URL

After deployment, Vercel will give you a URL like:
`https://your-backend-project.vercel.app`

**Save this URL** - you'll need it for the frontend configuration.

## 🎨 Frontend Deployment (Client)

### Step 1: Prepare Frontend Environment Variables

Create a `.env.local` file in the `clientnpm/` directory:

```env
# Development
VITE_API_URL=http://localhost:5000

# Production (update with your backend URL)
VITE_API_URL=https://your-backend-project.vercel.app
```

### Step 2: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**
2. **Click "New Project"**
3. **Import the same GitHub repository**
4. **Configure the project:**
   - **Framework Preset**: `Vite`
   - **Root Directory**: `clientnpm`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables** in Vercel:
   - `VITE_API_URL`: Your backend Vercel URL

6. **Deploy**

## 🔗 Connecting Frontend to Backend

### Update CORS in Backend

After getting your frontend URL, update the CORS configuration in `server/src/index.ts`:

```typescript
const allowedOrigins = [
  // Add your frontend Vercel URL here
  'https://your-frontend-project.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];
```

### Update Frontend API URL

In your frontend Vercel project settings, set:
- `VITE_API_URL`: `https://your-backend-project.vercel.app`

## 🔄 Deployment Workflow

### For Updates:

1. **Push changes to GitHub**
2. **Vercel automatically redeploys** (if auto-deploy is enabled)
3. **Or manually redeploy** from Vercel dashboard

### Environment Variables Management:

- **Backend**: Update in Vercel Project Settings → Environment Variables
- **Frontend**: Update `VITE_API_URL` in Vercel Project Settings

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Check that frontend URL is in backend CORS allowed origins
   - Verify environment variables are set correctly

2. **API Connection Issues**:
   - Verify `VITE_API_URL` is correct in frontend
   - Check backend is running and accessible

3. **Build Errors**:
   - Check `package.json` scripts
   - Verify all dependencies are installed

### Debug Steps:

1. **Test Backend API**: Visit `https://your-backend.vercel.app/api/test`
2. **Check Frontend Console**: Look for API connection errors
3. **Verify Environment Variables**: In Vercel dashboard

## 📝 Important Notes

- **Never commit `.env` files** to GitHub
- **Use Vercel's environment variables** for production
- **Test locally first** before deploying
- **Keep backend and frontend URLs updated** in CORS and environment variables

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Express CORS](https://expressjs.com/en/resources/middleware/cors.html) 