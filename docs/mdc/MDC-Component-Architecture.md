# MDC - Arquitectura de Componentes

## 1. Estructura de Carpetas

```
clientnpm/src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas principales
├── context/            # Contextos de React
├── hooks/              # Hooks personalizados
├── services/           # Servicios y configuración
├── utils/              # Utilidades
├── routes/             # Configuración de rutas
├── assets/             # Recursos estáticos
└── *.css               # Archivos de estilos organizados
```

## 2. Componentes de Layout

### Header.tsx
- **Propósito**: Navegación principal y logo
- **Props**: Ninguna
- **Estado**: Usa useLocation para cambiar logo
- **Funcionalidad**: 
  - Logo dinámico (claro/oscuro según ruta)
  - Menú de navegación
  - Iconos de usuario y carrito
  - Botón de logout

### Footer.tsx
- **Propósito**: Pie de página
- **Props**: Ninguna
- **Funcionalidad**:
  - Logo pequeño
  - Copyright
  - Enlaces a redes sociales

### ProtectedRoute.tsx
- **Propósito**: Protección de rutas
- **Props**: children (ReactNode)
- **Funcionalidad**:
  - Verifica si el usuario está autenticado
  - Redirige a login si no está autenticado
  - Muestra botones de login/register

## 3. Componentes de Autenticación

### Login.tsx
- **Propósito**: Formulario de inicio de sesión
- **Props**: Ninguna
- **Estado**: email, password, error
- **Funcionalidad**:
  - Validación de campos
  - Manejo de errores
  - Redirección post-login

### RegisterForm.tsx
- **Propósito**: Formulario de registro
- **Props**: Ninguna
- **Estado**: formData, message
- **Funcionalidad**:
  - Registro de usuarios
  - Validación de campos
  - Selección de rol (seller/buyer)

### LogOutButton.tsx
- **Propósito**: Botón de logout/login
- **Props**: Ninguna
- **Estado**: Usa AuthContext
- **Funcionalidad**:
  - Logout si está autenticado
  - Redirección a login/register si no

## 4. Componentes de Productos

### ProductList.tsx
- **Propósito**: Lista de productos
- **Props**: Ninguna
- **Estado**: products, loading, error
- **Funcionalidad**:
  - Fetch de productos
  - Grid responsive
  - Botones de acción por producto

### ProductDetail.tsx
- **Propósito**: Detalle de producto individual
- **Props**: Usa useParams para ID
- **Estado**: product, loading, reload
- **Funcionalidad**:
  - Información completa del producto
  - Botón de agregar al carrito
  - Sistema de comentarios

### ProductForm.tsx
- **Propósito**: Formulario de creación/edición de productos
- **Props**: Ninguna
- **Estado**: formData, imageFile, imagePreview
- **Funcionalidad**:
  - Subida de imágenes
  - Validación de campos
  - Integración con AlertModal

### MyStore.tsx
- **Propósito**: Gestión de productos del vendedor
- **Props**: Ninguna
- **Estado**: products, loadingProducts
- **Funcionalidad**:
  - Lista de productos del vendedor
  - Eliminación de productos
  - Acceso solo para vendedores

## 5. Componentes de Carrito

### ShoppingItemsList.tsx
- **Propósito**: Lista de items en carrito
- **Props**: Ninguna
- **Estado**: items, loading, error
- **Funcionalidad**:
  - Fetch de items del carrito
  - Eliminación de items
  - Acceso solo para compradores

### AddToCartButton.tsx
- **Propósito**: Botón para agregar al carrito
- **Props**: productId, quantity?, className?
- **Estado**: Usa useAlertModal
- **Funcionalidad**:
  - Agregar producto al carrito
  - Validación de autenticación
  - Feedback con AlertModal

## 6. Componentes de Comentarios

### CommentList.tsx
- **Propósito**: Lista de comentarios de un producto
- **Props**: productId (string)
- **Estado**: comments, loading
- **Funcionalidad**:
  - Fetch de comentarios
  - Ordenamiento por fecha
  - Display de autor y fecha

### CommentForm.tsx
- **Propósito**: Formulario para crear comentarios
- **Props**: productId (string), onCommentAdded (function)
- **Estado**: text
- **Funcionalidad**:
  - Creación de comentarios
  - Validación de autenticación
  - Callback para actualizar lista

## 7. Componentes de UI

### AlertModal.tsx
- **Propósito**: Modal de alertas y notificaciones
- **Props**: isOpen, onClose, type, title, message, showCloseButton?
- **Funcionalidad**:
  - Diferentes tipos de alerta (success, error, warning, info)
  - Iconos dinámicos
  - Animaciones
  - Responsive design

### Carousel.tsx
- **Propósito**: Carrusel de imágenes/contenido
- **Props**: slides (ReactNode[])
- **Estado**: current
- **Funcionalidad**:
  - Navegación infinita
  - Animaciones suaves
  - Controles personalizados

## 8. Hooks Personalizados

### useAlertModal.ts
- **Propósito**: Gestión de estado del AlertModal
- **Retorna**: alertState, showSuccess, showError, showWarning, showInfo, hideAlert
- **Funcionalidad**:
  - Estado centralizado de alertas
  - Métodos para mostrar diferentes tipos
  - Auto-hide configurable

### useUserStatus.tsx
- **Propósito**: Verificar estado de autenticación
- **Retorna**: boolean (isUserActive)
- **Funcionalidad**:
  - Verificación de token
  - Estado de autenticación

## 9. Contextos

### AuthContext.tsx
- **Propósito**: Gestión global de autenticación
- **Estado**: user, token, loadingUser, userReady
- **Métodos**: login, logout, register
- **Funcionalidad**:
  - Estado global de usuario
  - Métodos de autenticación
  - Persistencia de token

## 10. Servicios

### axiosInstance.ts
- **Propósito**: Configuración centralizada de Axios
- **Funcionalidad**:
  - Base URL configurada
  - Interceptores para tokens
  - Headers por defecto

## 11. Organización de Estilos

### Archivos CSS por Feature:
- **App.css**: Estilos globales y utilidades
- **alert-modal.css**: Estilos del AlertModal
- **carousel.css**: Estilos del Carousel
- **product-list.css**: Estilos de componentes de productos
- **forms.css**: Estilos de formularios
- **layout.css**: Estilos de Header, Footer, ProtectedRoute
- **buttons.css**: Estilos de botones

## 12. Patrones de Diseño

### Componentes Funcionales:
- Todos los componentes usan funciones
- Hooks para manejo de estado
- Props tipadas con TypeScript

### Separación de Responsabilidades:
- Componentes de presentación separados de lógica
- Hooks para lógica reutilizable
- Contextos para estado global

### Responsive Design:
- CSS Grid y Flexbox
- Media queries organizadas
- Componentes adaptables

## 13. Flujo de Datos

```
User Action → Component → Hook/Service → API → State Update → UI Update
```

### Ejemplo:
1. Usuario hace click en "Add to Cart"
2. AddToCartButton maneja el evento
3. Llama a axiosInstance para hacer POST
4. API responde con éxito/error
5. useAlertModal muestra feedback
6. UI se actualiza 