# 🔒 Protección de Archivos de Entorno - MB45 Furniture

## 🚨 REGLAS CRÍTICAS DE SEGURIDAD

### ❌ NUNCA HACER:
- Modificar archivos `.env*`
- Eliminar archivos de configuración de entorno
- Cambiar valores de variables existentes
- Mover archivos `.env*` a otras ubicaciones
- Sobrescribir archivos de entorno

### ✅ SOLO PERMITIDO:
- Leer archivos `.env*` para referencia
- Sugerir nuevas variables si es necesario
- Ayudar a configurar variables en Vercel
- Copiar valores existentes para configuración externa

## 📁 Archivos Protegidos

### Backend Environment
**Archivo**: `./server/.env`
**Contenido**:
```env
MONGO_URI=mongodb+srv://fernandocalixto89:Qwertyuiop*@cluster0.lo288ds.mongodb.net/miapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=algunaClaveSegura
CLOUDINARY_CLOUD_NAME=deqsrgxeu
CLOUDINARY_API_KEY=159759138367958
CLOUDINARY_API_SECRET=ewMcR0GAXIA2apjI1UWV949Ra-w%
```

### Frontend Development Environment
**Archivo**: `./clientnpm/.env`
**Contenido**:
```env
VITE_API_URL=http://localhost:5000/api
```

### Frontend Production Environment
**Archivo**: `./clientnpm/.env.production`
**Contenido**:
```env
VITE_API_URL=https://mb-45-mongo-db-git-main-fernando-calixtos-projects.vercel.app/api
```

## 🔧 Configuración en Vercel

### Variables de Entorno para Backend:
```env
MONGO_URI=mongodb+srv://fernandocalixto89:Qwertyuiop*@cluster0.lo288ds.mongodb.net/miapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=algunaClaveSegura
CLOUDINARY_CLOUD_NAME=deqsrgxeu
CLOUDINARY_API_KEY=159759138367958
CLOUDINARY_API_SECRET=ewMcR0GAXIA2apjI1UWV949Ra-w%
NODE_ENV=production
```

### Variables de Entorno para Frontend:
```env
VITE_API_URL=/api
```

## 🛡️ Medidas de Protección

### 1. Git Ignore
Los archivos `.env*` están en `.gitignore` para evitar que se suban a GitHub:
```
**/.env
**/.env.*
```

### 2. Cursor AI Rules
Reglas específicas en `.cursorrules` para proteger archivos de entorno.

### 3. Documentación
Este archivo sirve como referencia para las variables de entorno.

## 🔄 Flujo de Trabajo Seguro

### Para Desarrollo Local:
1. Los archivos `.env*` existen localmente
2. Las variables se cargan automáticamente
3. No modificar archivos de entorno

### Para Producción (Vercel):
1. Copiar valores de archivos `.env*` locales
2. Configurar en Vercel Dashboard
3. No modificar archivos locales

### Para Nuevas Variables:
1. Solo sugerir nuevas variables si es necesario
2. No modificar archivos existentes
3. Ayudar a configurar en Vercel

## 📞 En Caso de Problemas

### Si se pierden las variables:
1. Verificar que los archivos `.env*` existan localmente
2. Copiar valores desde archivos locales
3. Reconfigurar en Vercel Dashboard
4. No recrear archivos de entorno

### Si hay errores de configuración:
1. Verificar que las variables estén en Vercel
2. Verificar que los valores sean correctos
3. No modificar archivos locales
4. Solo ajustar configuración en Vercel

## ✅ Checklist de Seguridad

- [ ] Archivos `.env*` existen localmente
- [ ] Variables configuradas en Vercel
- [ ] Archivos protegidos en `.gitignore`
- [ ] Reglas de Cursor AI activas
- [ ] Documentación actualizada
- [ ] Backup de valores de variables

## 🔗 Referencias

- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Node.js Environment Variables](https://nodejs.org/api/process.html#processenv)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html) 