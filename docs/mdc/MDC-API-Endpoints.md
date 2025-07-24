# MDC - Endpoints de API

## 1. Configuración Base

### URL Base
```
http://localhost:5000/api
```

### Headers Comunes
```
Content-Type: application/json
Authorization: Bearer <token> (para rutas protegidas)
```

---

## 2. Autenticación (Auth Routes)

### POST /api/auth/register
**Registro de nuevo usuario**

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "address": "string",
  "city": "string",
  "country": "string",
  "postCode": "string",
  "role": "seller" | "buyer"
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

**Response (400):**
```json
{
  "message": "Error de validación"
}
```

---

### POST /api/auth/login
**Inicio de sesión**

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  }
}
```

**Response (401):**
```json
{
  "message": "Credenciales inválidas"
}
```

---

### GET /api/auth/me
**Obtener perfil del usuario actual**

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "country": "string",
    "postCode": "string",
    "role": "string"
  }
}
```

**Response (401):**
```json
{
  "message": "Token missing"
}
```

---

### PUT /api/auth/update
**Actualizar perfil de usuario**

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "city": "string",
  "country": "string",
  "postCode": "string"
}
```

**Response (200):**
```json
{
  "message": "Perfil actualizado exitosamente"
}
```

---

## 3. Productos (Product Routes)

### GET /api/products
**Obtener todos los productos**

**Response (200):**
```json
[
  {
    "_id": "string",
    "name": "string",
    "category": "string",
    "price": "number",
    "stock": "number",
    "mainMaterial": "string",
    "color": "string",
    "width": "number",
    "height": "number",
    "depth": "number",
    "description": "string",
    "image": "string",
    "seller": {
      "_id": "string",
      "name": "string",
      "email": "string"
    },
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

---

### GET /api/products/:id
**Obtener producto por ID**

**Response (200):**
```json
{
  "_id": "string",
  "name": "string",
  "category": "string",
  "price": "number",
  "stock": "number",
  "mainMaterial": "string",
  "color": "string",
  "width": "number",
  "height": "number",
  "depth": "number",
  "description": "string",
  "image": "string",
  "seller": {
    "_id": "string",
    "name": "string",
    "email": "string"
  },
  "createdAt": "date",
  "updatedAt": "date"
}
```

**Response (404):**
```json
{
  "message": "Producto no encontrado"
}
```

---

### POST /api/products/add
**Crear nuevo producto**

**Headers:** `Authorization: Bearer <token>`

**Body (multipart/form-data):**
```
name: string
category: string
price: number
stock: number
mainMaterial: string (opcional)
color: string (opcional)
width: number (opcional)
height: number (opcional)
depth: number (opcional)
description: string (opcional)
image: file
```

**Response (201):**
```json
{
  "message": "Producto creado exitosamente",
  "product": {
    "_id": "string",
    "name": "string",
    "category": "string",
    "price": "number",
    "stock": "number",
    "image": "string",
    "seller": "string"
  }
}
```

**Response (401):**
```json
{
  "message": "Token missing"
}
```

---

### GET /api/products/seller/:sellerId
**Obtener productos de un vendedor específico**

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
[
  {
    "_id": "string",
    "name": "string",
    "category": "string",
    "price": "number",
    "stock": "number",
    "image": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

---

### DELETE /api/products/:id
**Eliminar producto**

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Producto eliminado exitosamente"
}
```

**Response (403):**
```json
{
  "message": "No tienes permisos para eliminar este producto"
}
```

---

## 4. Carrito (Shopping Routes)

### GET /api/shopping
**Obtener items del carrito del usuario**

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
[
  {
    "_id": "string",
    "userId": "string",
    "productId": {
      "_id": "string",
      "name": "string",
      "price": "number",
      "image": "string",
      "description": "string",
      "category": "string",
      "mainMaterial": "string",
      "color": "string",
      "width": "number",
      "height": "number",
      "depth": "number",
      "stock": "number",
      "seller": {
        "name": "string",
        "email": "string"
      }
    },
    "quantity": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

**Response (401):**
```json
{
  "message": "Token missing"
}
```

---

### POST /api/shopping/add
**Agregar producto al carrito**

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "productId": "string",
  "quantity": "number"
}
```

**Response (201):**
```json
{
  "message": "Producto agregado al carrito",
  "item": {
    "_id": "string",
    "userId": "string",
    "productId": "string",
    "quantity": "number"
  }
}
```

**Response (401):**
```json
{
  "message": "Token missing"
}
```

---

### DELETE /api/shopping/:id
**Eliminar item del carrito**

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "message": "Item eliminado del carrito"
}
```

**Response (404):**
```json
{
  "message": "Item no encontrado"
}
```

---

## 5. Comentarios (Comment Routes)

### GET /api/comments/:productId
**Obtener comentarios de un producto**

**Response (200):**
```json
[
  {
    "_id": "string",
    "userId": {
      "_id": "string",
      "name": "string"
    },
    "productId": "string",
    "text": "string",
    "createdAt": "date"
  }
]
```

**Response (404):**
```json
{
  "message": "No se encontraron comentarios para este producto"
}
```

---

### POST /api/comments/:productId
**Crear nuevo comentario**

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "text": "string"
}
```

**Response (201):**
```json
{
  "_id": "string",
  "userId": "string",
  "productId": "string",
  "text": "string",
  "createdAt": "date"
}
```

**Response (401):**
```json
{
  "message": "Token missing"
}
```

---

## 6. Códigos de Estado HTTP

### Éxito:
- **200**: OK - Operación exitosa
- **201**: Created - Recurso creado exitosamente

### Error del Cliente:
- **400**: Bad Request - Datos inválidos
- **401**: Unauthorized - Token faltante o inválido
- **403**: Forbidden - Sin permisos
- **404**: Not Found - Recurso no encontrado

### Error del Servidor:
- **500**: Internal Server Error - Error interno del servidor

---

## 7. Validaciones

### Usuario:
- Email debe ser único
- Password mínimo 6 caracteres
- Todos los campos requeridos

### Producto:
- Precio y stock deben ser números positivos
- Imagen es requerida
- Categoría debe ser válida

### Comentario:
- Texto no puede estar vacío
- Usuario debe estar autenticado

### Carrito:
- Cantidad debe ser mayor a 0
- Usuario debe tener rol de comprador

---

## 8. Autenticación

### JWT Token:
- Se envía en header Authorization
- Formato: `Bearer <token>`
- Expiración: Configurable en variables de entorno

### Rutas Protegidas:
- Crear/editar/eliminar productos (solo vendedores)
- Operaciones de carrito (solo compradores)
- Crear comentarios (usuarios autenticados)
- Perfil de usuario (usuario autenticado)

---

## 9. Manejo de Errores

### Formato de Error:
```json
{
  "message": "Descripción del error",
  "errors": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

### Logs:
- Errores se registran en consola del servidor
- Incluyen timestamp y stack trace
- No se exponen detalles sensibles al cliente 