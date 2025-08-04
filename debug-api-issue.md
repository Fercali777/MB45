# 🐛 Debugging: API 404 Error

## 🔍 Problema Identificado
- ✅ Frontend: Funcionando en `https://mb-45-f46a.vercel.app/`
- ❌ Backend API: Error 404 en `https://mb-45-f46a.vercel.app/api/test`

## 🎯 Posibles Causas

### 1. Variables de Entorno No Configuradas
**Solución**: Verificar en Vercel Dashboard → Settings → Environment Variables

**Variables necesarias:**
```env
MONGO_URI=mongodb+srv://fernandocalixto89:Qwertyuiop*@cluster0.lo288ds.mongodb.net/miapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=algunaClaveSegura
CLOUDINARY_CLOUD_NAME=deqsrgxeu
CLOUDINARY_API_KEY=159759138367958
CLOUDINARY_API_SECRET=ewMcR0GAXIA2apjI1UWV949Ra-w%
NODE_ENV=production
VITE_API_URL=/api
```

### 2. Backend No Se Está Construyendo
**Solución**: Verificar logs de build en Vercel Dashboard

### 3. Problema con TypeScript
**Solución**: Verificar que el build de TypeScript funcione

## 🛠️ Pasos de Diagnóstico

### Paso 1: Verificar Variables de Entorno
1. Ve a Vercel Dashboard
2. Selecciona tu proyecto
3. Ve a Settings → Environment Variables
4. Verifica que todas las variables estén configuradas

### Paso 2: Verificar Logs de Build
1. Ve a Vercel Dashboard
2. Selecciona tu proyecto
3. Ve a Deployments
4. Haz clic en el último deploy
5. Revisa los logs de build

### Paso 3: Testear Rutas Básicas
```bash
# Health check básico
curl https://mb-45-f46a.vercel.app/

# API test
curl https://mb-45-f46a.vercel.app/api/test

# Usuarios
curl https://mb-45-f46a.vercel.app/api/users
```

### Paso 4: Verificar Configuración de Build
**Build Command**: `cd clientnpm && npm run build`
**Output Directory**: `clientnpm/dist`
**Install Command**: `npm install`

## 🔧 Soluciones Rápidas

### Solución 1: Redeploy con Variables
1. Configura todas las variables de entorno
2. Haz un redeploy manual
3. Verifica los logs

### Solución 2: Verificar TypeScript Build
1. Verifica que `server/package.json` tenga script de build
2. Verifica que TypeScript esté configurado correctamente
3. Haz un redeploy

### Solución 3: Simplificar vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "clientnpm/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "server/src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/src/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/clientnpm/$1"
    }
  ]
}
```

## 📊 Estado Actual
- ✅ Frontend: Funcionando
- ❌ Backend: Error 404
- ✅ vercel.json: Configurado correctamente
- ❓ Variables de entorno: Necesita verificación

## 🚀 Próximos Pasos
1. **Verificar variables de entorno en Vercel**
2. **Revisar logs de build**
3. **Hacer redeploy si es necesario**
4. **Testear nuevamente**

**¿Puedes verificar las variables de entorno en Vercel Dashboard?** 