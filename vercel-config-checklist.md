# ✅ Checklist de Configuración Vercel - Single Deploy

## 🔧 Configuración de Build (✅ Correcta)

### Build Command
```
cd clientnpm && npm run build
```
**Estado**: ✅ Correcto
**Explicación**: Cambia al directorio del frontend y ejecuta el build

### Output Directory
```
clientnpm/dist
```
**Estado**: ✅ Correcto
**Explicación**: Es donde Vite genera los archivos de producción

### Install Command
```
npm install
```
**Estado**: ✅ Correcto
**Explicación**: Instala dependencias del proyecto raíz

## 🔑 Variables de Entorno (Verificar)

### Backend Variables
```env
MONGO_URI=mongodb+srv://fernandocalixto89:Qwertyuiop*@cluster0.lo288ds.mongodb.net/miapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=algunaClaveSegura
CLOUDINARY_CLOUD_NAME=deqsrgxeu
CLOUDINARY_API_KEY=159759138367958
CLOUDINARY_API_SECRET=ewMcR0GAXIA2apjI1UWV949Ra-w%
NODE_ENV=production
```

### Frontend Variables
```env
VITE_API_URL=/api
```

## 🚀 Configuración de vercel.json (✅ Correcta)

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

## 📋 Checklist de Verificación

### ✅ Build Configuration
- [ ] Build Command: `cd clientnpm && npm run build`
- [ ] Output Directory: `clientnpm/dist`
- [ ] Install Command: `npm install`

### ✅ Environment Variables
- [ ] MONGO_URI configurado
- [ ] JWT_SECRET configurado
- [ ] CLOUDINARY_CLOUD_NAME configurado
- [ ] CLOUDINARY_API_KEY configurado
- [ ] CLOUDINARY_API_SECRET configurado
- [ ] NODE_ENV=production
- [ ] VITE_API_URL=/api

### ✅ vercel.json
- [ ] Configuración de builds correcta
- [ ] Rutas configuradas correctamente
- [ ] Frontend en `/` y backend en `/api`

## 🎯 URLs Esperadas

### Después del Deploy:
- **Frontend**: `https://tu-proyecto.vercel.app/`
- **Backend API**: `https://tu-proyecto.vercel.app/api/`
- **Ejemplo API**: `https://tu-proyecto.vercel.app/api/users/login`

## 🐛 Posibles Problemas

### Si el build falla:
1. Verificar que `clientnpm/package.json` existe
2. Verificar que `npm run build` funciona localmente
3. Verificar que las dependencias estén instaladas

### Si las rutas no funcionan:
1. Verificar que `vercel.json` esté en la raíz
2. Verificar que las rutas estén configuradas correctamente
3. Verificar que el backend esté exportando correctamente

### Si las variables no funcionan:
1. Verificar que estén configuradas en Vercel Dashboard
2. Verificar que los nombres sean exactos
3. Verificar que no haya espacios extra

## ✅ Estado Actual
- ✅ Configuración de build correcta
- ✅ vercel.json configurado correctamente
- ✅ Variables de entorno listas para configurar
- ✅ Single deploy configurado

**¡Tu configuración está perfecta para el deploy!** 