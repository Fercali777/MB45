# MDC - Modelos de Datos

## 1. Modelo User (Usuario)

### Propiedades:
- **name** (String, required): Nombre completo del usuario
- **email** (String, required, unique): Email único del usuario
- **password** (String, required): Contraseña hasheada
- **phone** (String, required): Número de teléfono
- **address** (String, required): Dirección física
- **city** (String, required): Ciudad
- **country** (String, required): País
- **postCode** (String, required): Código postal
- **role** (Enum: 'seller' | 'buyer', default: 'seller'): Rol del usuario

### Relaciones:
- Un usuario puede tener múltiples productos (como vendedor)
- Un usuario puede tener múltiples items en carrito (como comprador)
- Un usuario puede tener múltiples comentarios

### Validaciones:
- Email debe ser único
- Todos los campos son requeridos
- Role debe ser 'seller' o 'buyer'

---

## 2. Modelo Product (Producto)

### Propiedades:
- **name** (String, required): Nombre del producto
- **category** (String, required): Categoría del producto
- **price** (Number, required): Precio del producto
- **stock** (Number, required): Cantidad disponible
- **mainMaterial** (String, optional): Material principal
- **color** (String, optional): Color del producto
- **width** (Number, optional): Ancho en cm
- **height** (Number, optional): Alto en cm
- **depth** (Number, optional): Profundidad en cm
- **description** (String, optional): Descripción del producto
- **image** (String, required): URL de la imagen
- **seller** (ObjectId, ref: 'User', required): ID del vendedor

### Timestamps:
- **createdAt**: Fecha de creación
- **updatedAt**: Fecha de última actualización

### Relaciones:
- Pertenece a un User (vendedor)
- Puede tener múltiples ShoppingItems
- Puede tener múltiples Comments

### Validaciones:
- Precio y stock deben ser números positivos
- Imagen es requerida
- Vendedor es requerido

---

## 3. Modelo ShoppingItem (Item de Carrito)

### Propiedades:
- **userId** (ObjectId, ref: 'User', required): ID del usuario comprador
- **productId** (ObjectId, ref: 'Product', required): ID del producto
- **quantity** (Number, default: 1): Cantidad del producto

### Timestamps:
- **createdAt**: Fecha de creación
- **updatedAt**: Fecha de última actualización

### Relaciones:
- Pertenece a un User (comprador)
- Referencia a un Product

### Validaciones:
- Usuario y producto son requeridos
- Cantidad por defecto es 1

---

## 4. Modelo Comment (Comentario)

### Propiedades:
- **userId** (ObjectId, ref: 'User', required): ID del usuario que comenta
- **productId** (ObjectId, ref: 'Product', required): ID del producto comentado
- **text** (String, required): Contenido del comentario
- **createdAt** (Date, default: Date.now): Fecha de creación

### Relaciones:
- Pertenece a un User (autor del comentario)
- Referencia a un Product (producto comentado)

### Validaciones:
- Usuario, producto y texto son requeridos
- Fecha se genera automáticamente

---

## 5. Diagrama de Relaciones

```
User (1) ←→ (N) Product
User (1) ←→ (N) ShoppingItem
User (1) ←→ (N) Comment
Product (1) ←→ (N) ShoppingItem
Product (1) ←→ (N) Comment
```

## 6. Reglas de Negocio

### Usuarios:
- Un usuario puede ser vendedor o comprador
- Los vendedores pueden crear productos
- Los compradores pueden agregar productos al carrito
- Todos los usuarios pueden comentar productos

### Productos:
- Solo los vendedores pueden crear productos
- Los productos deben tener stock disponible
- Los productos pueden ser comentados por cualquier usuario

### Carrito:
- Solo los compradores pueden tener items en carrito
- La cantidad debe ser mayor a 0
- Un usuario no puede tener el mismo producto duplicado en carrito

### Comentarios:
- Cualquier usuario autenticado puede comentar
- Los comentarios se ordenan por fecha de creación (más recientes primero)
- Los comentarios muestran el nombre del autor 