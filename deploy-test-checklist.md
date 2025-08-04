# 🧪 Checklist de Testing - Deploy Vercel

## 🎯 URLs de tu Aplicación

### URL Principal (Producción)
```
https://mb-45-f46a.vercel.app
```

### URL de Rama Main (Desarrollo)
```
https://mb-45-f46a-git-main-fernando-calixtos-projects.vercel.app
```

### URL de Deploy Específico
```
https://mb-45-f46a-c5xmwg004-fernando-calixtos-projects.vercel.app
```

## ✅ Testing Checklist

### 1. Frontend Testing
- [ ] **Página principal carga**: `https://mb-45-f46a.vercel.app/`
- [ ] **Navegación funciona**: Menús, enlaces, botones
- [ ] **Responsive design**: Se ve bien en móvil/desktop
- [ ] **Imágenes cargan**: Productos, logos, etc.

### 2. Backend API Testing
- [ ] **Health check**: `https://mb-45-f46a.vercel.app/api/test`
- [ ] **API responde**: Debe mostrar información del servidor
- [ ] **CORS funciona**: Frontend puede hacer llamadas a API
- [ ] **Base de datos**: Conexión a MongoDB funciona

### 3. Funcionalidades Core
- [ ] **Registro de usuarios**: `/register`
- [ ] **Login de usuarios**: `/login`
- [ ] **Lista de productos**: `/api/products`
- [ ] **Panel de admin**: `/admin` (si tienes admin)
- [ ] **Carrito de compras**: Funcionalidad de agregar/quitar
- [ ] **Favoritos**: Sistema de favoritos
- [ ] **Comentarios**: Sistema de comentarios

### 4. Autenticación
- [ ] **JWT funciona**: Tokens se generan correctamente
- [ ] **Protección de rutas**: Rutas protegidas funcionan
- [ ] **Logout**: Funciona correctamente
- [ ] **Perfil de usuario**: Se puede ver/editar perfil

### 5. Subida de Archivos
- [ ] **Cloudinary funciona**: Subida de imágenes de productos
- [ ] **Imágenes se muestran**: URLs de Cloudinary funcionan
- [ ] **Validación de archivos**: Solo acepta imágenes válidas

## 🐛 Problemas Comunes y Soluciones

### Si el frontend no carga:
1. Verificar que el build fue exitoso
2. Verificar variables de entorno del frontend
3. Verificar que `VITE_API_URL=/api`

### Si la API no responde:
1. Verificar variables de entorno del backend
2. Verificar conexión a MongoDB
3. Verificar que `NODE_ENV=production`

### Si hay errores de CORS:
1. Verificar que la URL del frontend esté en CORS del backend
2. Verificar que `VITE_API_URL` sea correcta
3. Verificar configuración de rutas en `vercel.json`

### Si la autenticación no funciona:
1. Verificar `JWT_SECRET` en variables de entorno
2. Verificar que el token se esté enviando correctamente
3. Verificar rutas de autenticación

## 📊 URLs de Testing

### Health Check
```
GET https://mb-45-f46a.vercel.app/api/test
```

### API de Usuarios
```
POST https://mb-45-f46a.vercel.app/api/users/register
POST https://mb-45-f46a.vercel.app/api/users/login
GET https://mb-45-f46a.vercel.app/api/users/me
```

### API de Productos
```
GET https://mb-45-f46a.vercel.app/api/products
POST https://mb-45-f46a.vercel.app/api/products
GET https://mb-45-f46a.vercel.app/api/products/:id
```

## 🎯 Estado del Deploy

### ✅ Deploy Exitoso
- **Status**: Ready
- **Environment**: Production
- **Time to Ready**: 36s
- **URLs**: 3 URLs generadas correctamente

### ✅ Configuración Correcta
- Single deploy funcionando
- Frontend y backend en una URL
- Variables de entorno configuradas
- CORS configurado correctamente

## 🚀 Próximos Pasos

1. **Testear la URL principal**: `https://mb-45-f46a.vercel.app`
2. **Verificar que la API funcione**: `/api/test`
3. **Testear funcionalidades principales**
4. **Configurar dominio personalizado** (opcional)

**¡Tu deploy está funcionando correctamente!** 