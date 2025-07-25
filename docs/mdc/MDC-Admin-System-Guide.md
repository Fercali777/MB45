# MDC - Sistema de Administración

## 🎯 **Sistema de Super Usuario Admin**

Sistema completo para administrar todos los productos y usuarios de la plataforma.

---

## 🚀 **Configuración Inicial**

### **1. Crear Usuario Admin**

```bash
# En el directorio server
npm run create-admin
```

**Credenciales por defecto:**
- **Email**: `admin@mb45.com`
- **Password**: `admin123`
- **Role**: `admin`

### **2. Acceder al Panel Admin**

```
http://localhost:5173/admin
```

---

## 🛠️ **Funcionalidades del Panel Admin**

### **📊 Estadísticas en Tiempo Real**
- Total de usuarios (admins, sellers, buyers)
- Total de productos (activos, eliminados)
- Vista general del sistema

### **📦 Gestión de Productos**

#### **Ver Productos:**
- **Todos los productos**: Incluye activos y eliminados
- **Solo activos**: Productos disponibles para usuarios
- **Solo eliminados**: Productos marcados como eliminados

#### **Acciones por Producto:**
- **🗑️ Eliminar**: Soft delete del producto
- **🔄 Restaurar**: Recuperar producto eliminado
- **📋 Información**: Detalles completos del producto

#### **Acciones Masivas:**
- **🗑️ Eliminar productos de prueba**: Limpieza automática

---

## 🔐 **Rutas API del Admin**

### **Autenticación**
Todas las rutas requieren token de admin:
```
Authorization: Bearer <admin_token>
```

### **Productos**
```
GET    /api/admin/products          # Todos los productos
GET    /api/admin/products/active   # Solo productos activos
GET    /api/admin/products/deleted  # Solo productos eliminados
DELETE /api/admin/products/:id      # Eliminar producto específico
PATCH  /api/admin/products/:id/restore  # Restaurar producto
```

### **Estadísticas**
```
GET    /api/admin/stats             # Estadísticas generales
```

### **Limpieza Masiva**
```
DELETE /api/admin/products/cleanup/bulk  # Eliminar productos de prueba
```

---

## 🎨 **Interfaz del Panel Admin**

### **Header**
- Título del panel
- Saludo personalizado al admin

### **Estadísticas**
- **Tarjeta de Usuarios**: Total, admins, sellers, buyers
- **Tarjeta de Productos**: Total, activos, eliminados

### **Controles**
- **Botones de vista**: All, Active, Deleted
- **Botón de limpieza**: Eliminar productos de prueba

### **Lista de Productos**
- **Grid responsivo** de productos
- **Información completa**: Nombre, precio, stock, vendedor
- **Estado visual**: Productos eliminados marcados
- **Acciones**: Eliminar/Restaurar por producto

---

## 🔧 **Middleware de Seguridad**

### **requireAdmin**
- Verifica token de autenticación
- Valida rol de admin
- Bloquea acceso no autorizado

### **optionalAdmin**
- Verifica admin sin bloquear
- Útil para funcionalidades opcionales

---

## 📱 **Responsive Design**

### **Desktop**
- Grid de 3-4 columnas para productos
- Estadísticas en fila horizontal
- Controles completos visibles

### **Mobile**
- Grid de 1 columna para productos
- Estadísticas apiladas verticalmente
- Controles adaptados para touch

---

## 🎯 **Casos de Uso**

### **1. Moderación de Contenido**
```
1. Acceder a /admin
2. Ver todos los productos
3. Identificar contenido inapropiado
4. Eliminar producto específico
5. Verificar eliminación
```

### **2. Limpieza de Pruebas**
```
1. Acceder a /admin
2. Hacer clic en "Delete Test Products"
3. Confirmar eliminación masiva
4. Verificar estadísticas actualizadas
```

### **3. Recuperación de Productos**
```
1. Cambiar vista a "Deleted Only"
2. Encontrar producto a restaurar
3. Hacer clic en "Restore"
4. Verificar restauración
```

### **4. Monitoreo del Sistema**
```
1. Revisar estadísticas diarias
2. Identificar patrones de uso
3. Detectar productos problemáticos
4. Tomar acciones preventivas
```

---

## 🔒 **Seguridad**

### **Autenticación**
- Token JWT requerido
- Verificación de rol admin
- Sesión segura

### **Autorización**
- Solo admins pueden acceder
- Validación en frontend y backend
- Logs de acciones administrativas

### **Validación**
- Verificación de IDs válidos
- Sanitización de datos
- Manejo de errores robusto

---

## 🚀 **Comandos Útiles**

### **Crear Admin**
```bash
npm run create-admin
```

### **Ver Logs del Servidor**
```bash
npm run dev
```

### **Reiniciar Servidor**
```bash
# Ctrl+C para parar
npm run dev
```

---

## 📋 **Checklist de Implementación**

- ✅ Modelo User actualizado con rol admin
- ✅ Middleware de autenticación admin
- ✅ Rutas API administrativas
- ✅ Componente AdminPanel
- ✅ Estilos CSS responsivos
- ✅ Integración con rutas del frontend
- ✅ Script de creación de admin
- ✅ Documentación completa

---

## 🎉 **¡Sistema Admin Listo!**

**Características implementadas:**
- 🔐 Autenticación segura de admin
- 📊 Panel de estadísticas en tiempo real
- 🗑️ Gestión completa de productos
- 🔄 Sistema de restauración
- 📱 Interfaz responsiva
- 🛡️ Middleware de seguridad
- 📋 Documentación completa

**Para empezar:**
1. Ejecutar `npm run create-admin`
2. Iniciar sesión con `admin@mb45.com` / `admin123`
3. Acceder a `http://localhost:5173/admin`
4. ¡Gestionar la plataforma!

**¡El sistema de super usuario admin está completamente funcional!** 🚀✨ 