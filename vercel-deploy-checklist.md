# ✅ Vercel Deployment Checklist

## 🔧 Backend (Server) Checklist

### ✅ Configuration Files
- [ ] `server/vercel.json` exists and is configured
- [ ] `server/package.json` has correct scripts (`build`, `start`)
- [ ] `server/src/index.ts` exports app for Vercel
- [ ] CORS configuration includes frontend URLs

### ✅ Environment Variables (Set in Vercel Dashboard)
- [ ] `MONGO_URI` - MongoDB Atlas connection string
- [ ] `JWT_SECRET` - Secret key for JWT tokens
- [ ] `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- [ ] `CLOUDINARY_API_KEY` - Cloudinary API key
- [ ] `CLOUDINARY_API_SECRET` - Cloudinary API secret
- [ ] `NODE_ENV` - Set to `production`

### ✅ Vercel Project Settings
- [ ] Framework Preset: `Node.js`
- [ ] Root Directory: `server`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: (leave empty)
- [ ] Install Command: `npm install`

## 🎨 Frontend (Client) Checklist

### ✅ Configuration Files
- [ ] `clientnpm/vercel.json` exists and is configured
- [ ] `clientnpm/package.json` has correct scripts
- [ ] `clientnpm/src/services/axiosInstance.ts` uses environment variables

### ✅ Environment Variables (Set in Vercel Dashboard)
- [ ] `VITE_API_URL` - Backend Vercel URL

### ✅ Vercel Project Settings
- [ ] Framework Preset: `Vite`
- [ ] Root Directory: `clientnpm`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

## 🔗 Connection Checklist

### ✅ Backend to Frontend
- [ ] Backend CORS includes frontend Vercel URL
- [ ] Frontend `VITE_API_URL` points to backend Vercel URL
- [ ] Both projects are deployed and accessible

### ✅ Testing Checklist
- [ ] Backend API test: `https://your-backend.vercel.app/api/test`
- [ ] Frontend loads without console errors
- [ ] API calls work from frontend to backend
- [ ] Authentication works (login/register)
- [ ] Database operations work (CRUD)

## 🚀 Deployment Steps

### 1. Deploy Backend First
1. Go to Vercel Dashboard
2. Create new project
3. Import GitHub repository
4. Configure as Node.js project
5. Set root directory to `server`
6. Add environment variables
7. Deploy
8. **Save the backend URL**

### 2. Deploy Frontend
1. Go to Vercel Dashboard
2. Create new project
3. Import same GitHub repository
4. Configure as Vite project
5. Set root directory to `clientnpm`
6. Add `VITE_API_URL` environment variable with backend URL
7. Deploy
8. **Save the frontend URL**

### 3. Update CORS
1. Go to backend project in Vercel
2. Add frontend URL to CORS allowed origins
3. Redeploy backend

### 4. Test Everything
1. Test backend API endpoints
2. Test frontend functionality
3. Test authentication flow
4. Test database operations

## 🐛 Common Issues & Solutions

### CORS Errors
- **Problem**: Frontend can't connect to backend
- **Solution**: Add frontend URL to backend CORS configuration

### Environment Variables Not Working
- **Problem**: Variables not accessible in code
- **Solution**: Check Vercel dashboard environment variables

### Build Failures
- **Problem**: Deployment fails during build
- **Solution**: Check package.json scripts and dependencies

### API Connection Issues
- **Problem**: Frontend can't reach backend
- **Solution**: Verify `VITE_API_URL` is correct

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors 