# MDC - Mejores Prácticas para Eliminación de Productos

## 🚨 **Problema: Eliminación Directa en MongoDB**

Eliminar productos directamente en MongoDB puede causar conflictos graves:

### **Conflictos Potenciales:**
1. **Referencias rotas en favoritos** - Usuarios con productos eliminados en favoritos
2. **Carritos huérfanos** - Items en carrito que referencian productos inexistentes
3. **Comentarios sin contexto** - Reviews sin producto asociado
4. **Historial de pedidos corrupto** - Pedidos anteriores con productos eliminados

---

## ✅ **Solución: Soft Delete (Eliminación Suave)**

### **Implementación:**

#### 1. **Modelo Product Actualizado**
```typescript
const productSchema = new mongoose.Schema({
  // ... campos existentes ...
  isDeleted: { type: Boolean, default: false }, // Marca si está eliminado
  deletedAt: { type: Date }, // Cuándo fue eliminado
}, { timestamps: true });
```

#### 2. **Rutas Actualizadas**
- `GET /api/products` - Solo muestra productos activos (`isDeleted: false`)
- `GET /api/products/:id` - Solo muestra productos activos
- `DELETE /api/products/:id` - Soft delete (marca como eliminado)
- `PATCH /api/products/:id/restore` - Restaura producto eliminado

#### 3. **Limpieza Automática de Referencias**
```typescript
const cleanupProductReferences = async (productId: string) => {
  // Remover de favoritos
  await User.updateMany(
    { favorites: productId },
    { $pull: { favorites: productId } }
  );
  
  // Eliminar del carrito
  await ShoppingItem.deleteMany({ productId });
  
  // Eliminar comentarios
  await Comment.deleteMany({ productId });
};
```

---

## 🔧 **Rutas Administrativas**

### **Ver Productos Eliminados**
```
GET /api/products/admin/deleted
```

### **Estadísticas de Limpieza**
```
GET /api/products/admin/stats
```

### **Restaurar Producto**
```
PATCH /api/products/:id/restore
```

---

## 📊 **Ventajas del Soft Delete**

### ✅ **Beneficios:**
- **Sin referencias rotas** - Los usuarios no ven errores
- **Recuperación posible** - Se pueden restaurar productos
- **Auditoría completa** - Se mantiene historial
- **Limpieza gradual** - Se pueden eliminar permanentemente después de X días

### 🔄 **Flujo de Trabajo:**
1. **Eliminación**: Producto se marca como `isDeleted: true`
2. **Limpieza**: Referencias se eliminan automáticamente
3. **Recuperación**: Producto se puede restaurar si es necesario
4. **Limpieza permanente**: Después de 30 días se puede eliminar definitivamente

---

## 🛠️ **Scripts de Mantenimiento**

### **Limpieza Masiva de Productos**
```bash
# Eliminar productos de prueba desde el panel admin
DELETE /api/admin/products/cleanup/bulk
```

### **Estadísticas de Limpieza**
```bash
# Obtener estadísticas desde el panel admin
GET /api/admin/stats
```

---

## 🎯 **Recomendaciones**

### **Para Desarrolladores:**
1. **Nunca eliminar directamente** en MongoDB
2. **Usar siempre soft delete** para productos
3. **Implementar limpieza automática** de referencias
4. **Usar el panel admin** para gestión

### **Para Administradores:**
1. **Usar el panel admin** en `/admin`
2. **Revisar productos eliminados** regularmente
3. **Restaurar productos** si es necesario
4. **Monitorear estadísticas** de eliminación

---

## 🔍 **Monitoreo y Alertas**

### **Métricas a Seguir:**
- Productos eliminados por día
- Productos restaurados
- Referencias limpiadas
- Tamaño de la base de datos

### **Alertas Recomendadas:**
- Muchos productos eliminados en poco tiempo
- Productos eliminados por vendedores específicos
- Errores en la limpieza de referencias

---

## 📝 **Ejemplo de Uso**

### **Eliminar Producto:**
```bash
DELETE /api/products/64f8a1b2c3d4e5f6a7b8c9d0
# Marca como eliminado y limpia referencias
```

### **Restaurar Producto:**
```bash
PATCH /api/products/64f8a1b2c3d4e5f6a7b8c9d0/restore
# Restaura el producto eliminado
```

### **Ver Productos Eliminados:**
```bash
GET /api/products/admin/deleted
# Lista todos los productos eliminados
```

---

## 🚀 **Implementación Completa**

El sistema ya está implementado con:
- ✅ Soft delete en el modelo Product
- ✅ Rutas actualizadas para filtrar productos eliminados
- ✅ Limpieza automática de referencias
- ✅ Rutas administrativas
- ✅ Scripts de mantenimiento
- ✅ Documentación completa

**¡Tu aplicación ahora es segura para eliminar productos sin conflictos!** 🎉 