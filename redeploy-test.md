# 🧪 Testing del Redeploy - VITE_API_URL=/api

## ✅ Configuración Correcta
- **VITE_API_URL**: `/api` ✅
- **Single Deploy**: Funcionando ✅
- **Variables de entorno**: Configuradas ✅

## 🎯 URLs para Testing

### 1. Health Check de la API
```
GET https://mb-45-f46a.vercel.app/api/test
```
**Esperado**: JSON con información del servidor y variables de entorno

### 2. Frontend Principal
```
GET https://mb-45-f46a.vercel.app/
```
**Esperado**: Página principal de MB45 Furniture

### 3. API de Usuarios
```
GET https://mb-45-f46a.vercel.app/api/users/me
```
**Esperado**: 401 (no autenticado) o información del usuario

### 4. API de Productos
```
GET https://mb-45-f46a.vercel.app/api/products
```
**Esperado**: Lista de productos o array vacío

## 🔍 Verificaciones Específicas

### Frontend Testing
- [ ] **Página carga**: Sin errores en consola
- [ ] **Navegación**: Menús y enlaces funcionan
- [ ] **Responsive**: Se ve bien en móvil/desktop
- [ ] **Imágenes**: Productos y logos cargan

### Backend Testing
- [ ] **API responde**: `/api/test` devuelve JSON
- [ ] **MongoDB conectado**: Variables de entorno funcionan
- [ ] **CORS funciona**: Frontend puede hacer llamadas
- [ ] **JWT funciona**: Autenticación disponible

### Funcionalidades Core
- [ ] **Registro**: `/register` funciona
- [ ] **Login**: `/login` funciona
- [ ] **Productos**: Lista y detalles funcionan
- [ ] **Carrito**: Agregar/quitar productos
- [ ] **Favoritos**: Sistema de favoritos
- [ ] **Comentarios**: Sistema de comentarios

## 🐛 Posibles Problemas

### Si el frontend no hace llamadas a la API:
1. Verificar que `VITE_API_URL=/api` esté configurado
2. Verificar que no haya errores de CORS
3. Verificar que las rutas estén correctas

### Si la API no responde:
1. Verificar variables de entorno del backend
2. Verificar conexión a MongoDB
3. Verificar que `NODE_ENV=production`

### Si hay errores de autenticación:
1. Verificar `JWT_SECRET` en variables
2. Verificar que el token se envíe correctamente
3. Verificar rutas protegidas

## 📊 Variables de Entorno Verificadas

### Backend (Vercel Dashboard):
```env
MONGO_URI=mongodb+srv://fernandocalixto89:Qwertyuiop*@cluster0.lo288ds.mongodb.net/miapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=algunaClaveSegura
CLOUDINARY_CLOUD_NAME=deqsrgxeu
CLOUDINARY_API_KEY=159759138367958
CLOUDINARY_API_SECRET=ewMcR0GAXIA2apjI1UWV949Ra-w%
NODE_ENV=production
```

### Frontend (Vercel Dashboard):
```env
VITE_API_URL=/api
```

## 🎯 Estado Esperado

### ✅ Deploy Exitoso
- **Status**: Ready
- **Frontend**: Carga correctamente
- **Backend**: API responde
- **CORS**: Sin errores
- **Variables**: Todas configuradas

### ✅ Funcionalidades
- **Autenticación**: Registro/Login funciona
- **Productos**: CRUD funciona
- **Carrito**: Agregar/quitar funciona
- **Favoritos**: Sistema funciona
- **Comentarios**: Sistema funciona

## 🚀 Próximos Pasos

1. **Testear URLs principales**
2. **Verificar funcionalidades core**
3. **Testear autenticación**
4. **Configurar dominio personalizado** (opcional)

**¡El redeploy está listo para testing!** 