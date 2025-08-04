# 🧪 Testing: Creación de Productos

## 🔍 Problema Identificado
- ❌ Error 500 al crear productos
- ❌ "Error adding product" en frontend
- ✅ API básica funcionando
- ✅ Autenticación funcionando

## 🛠️ Fixes Aplicados

### 1. ✅ Mejorado manejo de errores
- Logging detallado para debugging
- Validación de campos requeridos
- Verificación de roles de usuario
- Mejor manejo de JWT

### 2. ✅ Validación de datos
- Verificar campos requeridos
- Convertir strings a números
- Validar roles de usuario (seller/admin)

### 3. ✅ Mejor debugging
- Logs detallados en cada paso
- Información de errores más clara
- Validación de token JWT

## 🧪 Testing Steps

### Paso 1: Verificar Autenticación
1. **Login como usuario**
2. **Verificar que el token se guarde** en localStorage
3. **Verificar que el usuario tenga rol seller o admin**

### Paso 2: Testear Creación de Producto
1. **Ir al formulario de crear producto**
2. **Llenar todos los campos requeridos:**
   - Name: "Test Product"
   - Category: "chair"
   - Price: 299
   - Stock: 10
   - Main Material: "Wood"
   - Color: "Brown"
   - Description: "Test product"
   - Image: Seleccionar imagen

### Paso 3: Verificar Logs
**En Vercel Dashboard → Functions → Logs:**
- Buscar logs de `/api/products/add`
- Verificar que no haya errores de JWT
- Verificar que el usuario se encuentre
- Verificar que los datos sean válidos

## 🐛 Posibles Problemas

### Si el error persiste:

#### 1. Problema de Autenticación
**Síntomas**: Error 401
**Solución**: 
- Verificar que el usuario esté logueado
- Verificar que el token sea válido
- Verificar que el usuario tenga rol seller/admin

#### 2. Problema de Datos
**Síntomas**: Error 400
**Solución**:
- Verificar que todos los campos requeridos estén llenos
- Verificar que price y stock sean números

#### 3. Problema de Cloudinary
**Síntomas**: Error al subir imagen
**Solución**:
- Verificar variables de entorno de Cloudinary
- Verificar que la imagen sea válida

#### 4. Problema de Base de Datos
**Síntomas**: Error 500
**Solución**:
- Verificar conexión a MongoDB
- Verificar que el modelo Product esté correcto

## 📊 Datos de Prueba

### Usuario Seller:
```json
{
  "name": "Test Seller",
  "email": "seller@test.com",
  "password": "password123",
  "role": "seller"
}
```

### Producto de Prueba:
```json
{
  "name": "Test Chair",
  "category": "chair",
  "price": 299,
  "stock": 10,
  "mainMaterial": "Wood",
  "color": "Brown",
  "width": 50,
  "height": 80,
  "depth": 60,
  "description": "A comfortable test chair",
  "image": "https://res.cloudinary.com/deqsrgxeu/image/upload/v1748193530/yrfxl2ggukafyfihbwvi.png"
}
```

## 🎯 URLs de Testing

### Crear Usuario:
```
POST https://mb-45-f46a-ixz0f4bxx-fernando-calixtos-projects.vercel.app/api/users/register
```

### Login:
```
POST https://mb-45-f46a-ixz0f4bxx-fernando-calixtos-projects.vercel.app/api/users/login
```

### Crear Producto:
```
POST https://mb-45-f46a-ixz0f4bxx-fernando-calixtos-projects.vercel.app/api/products/add
```

## ✅ Estado Esperado

### Después del Fix:
- ✅ Usuario se puede registrar como seller
- ✅ Usuario puede hacer login
- ✅ Token JWT se genera correctamente
- ✅ Formulario de producto funciona
- ✅ Producto se crea exitosamente
- ✅ Producto aparece en la lista

**¡El redeploy debería solucionar el problema de creación de productos!** 