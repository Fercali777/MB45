# MDC - Estructura del Proyecto

## 1. Visión General

### Tipo de Proyecto
E-commerce de muebles con sistema de roles (vendedor/comprador)

### Stack Tecnológico
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Base de Datos**: MongoDB + Mongoose
- **Autenticación**: JWT
- **Estilos**: CSS organizado por features
- **Deployment**: Vercel (Frontend) + Vercel (Backend)

---

## 2. Estructura de Carpetas

```
Project/
├── clientnpm/                 # Frontend React
│   ├── public/                # Archivos estáticos
│   │   └── img/              # Imágenes del proyecto
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── pages/           # Páginas principales
│   │   ├── context/         # Contextos de React
│   │   ├── hooks/           # Hooks personalizados
│   │   ├── services/        # Servicios y configuración
│   │   ├── utils/           # Utilidades
│   │   ├── routes/          # Configuración de rutas
│   │   ├── assets/          # Recursos estáticos
│   │   ├── App.tsx          # Componente principal
│   │   ├── main.tsx         # Punto de entrada
│   │   ├── App.css          # Estilos globales
│   │   └── carousel.css     # Estilos del carousel
│   ├── package.json
│   └── vite.config.ts
├── server/                   # Backend Node.js
│   ├── src/
│   │   ├── models/          # Modelos de MongoDB
│   │   ├── routes/          # Rutas de la API
│   │   ├── middlewares/     # Middlewares personalizados
│   │   ├── controllers/     # Controladores
│   │   ├── config/          # Configuraciones
│   │   ├── types/           # Tipos TypeScript
│   │   └── index.ts         # Punto de entrada
│   ├── Dist/                # Código compilado
│   ├── package.json
│   └── tsconfig.json
├── package.json             # Dependencias raíz
└── .gitignore
```

---

## 3. Frontend (clientnpm/)

### 3.1 Componentes (/src/components/)

#### Layout Components:
- **Header.tsx**: Navegación principal y logo dinámico
- **Footer.tsx**: Pie de página con enlaces sociales
- **ProtectedRoute.tsx**: Protección de rutas

#### Authentication Components:
- **Login.tsx**: Formulario de inicio de sesión
- **RegisterForm.tsx**: Formulario de registro
- **LogOutButton.tsx**: Botón de logout/login

#### Product Components:
- **ProductList.tsx**: Lista de productos con grid
- **ProductDetail.tsx**: Detalle de producto individual
- **ProductForm.tsx**: Formulario de creación/edición
- **MyStore.tsx**: Gestión de productos del vendedor

#### Shopping Components:
- **ShoppingItemsList.tsx**: Lista de items en carrito
- **AddToCartButton.tsx**: Botón para agregar al carrito

#### Comment Components:
- **CommentList.tsx**: Lista de comentarios
- **CommentForm.tsx**: Formulario de comentarios

#### UI Components:
- **AlertModal.tsx**: Modal de alertas y notificaciones
- **Carousel.tsx**: Carrusel de contenido

### 3.2 Páginas (/src/pages/)

- **Home.tsx**: Página principal con carousel
- **Dashboard.tsx**: Panel de control del usuario
- **Furnitures.tsx**: Página de muebles
- **LoginPage.tsx**: Página de login
- **RegisterPage.tsx**: Página de registro
- **ShoppingList.tsx**: Página del carrito

### 3.3 Contextos (/src/context/)

- **AuthContext.tsx**: Gestión global de autenticación

### 3.4 Hooks (/src/hooks/)

- **useAlertModal.ts**: Hook para gestión de alertas
- **useUserStatus.tsx**: Hook para verificar estado de usuario

### 3.5 Servicios (/src/services/)

- **axiosInstance.ts**: Configuración centralizada de Axios

### 3.6 Utilidades (/src/utils/)

- **useUserStatus.tsx**: Utilidad para verificar autenticación

### 3.7 Rutas (/src/routes/)

- **AppRoutes.tsx**: Configuración de layout y rutas

### 3.8 Estilos CSS

#### Organización por Features:
- **App.css**: Estilos globales y utilidades
- **alert-modal.css**: Estilos del AlertModal
- **carousel.css**: Estilos del Carousel
- **product-list.css**: Estilos de componentes de productos
- **forms.css**: Estilos de formularios
- **layout.css**: Estilos de Header, Footer, ProtectedRoute
- **buttons.css**: Estilos de botones

---

## 4. Backend (server/)

### 4.1 Modelos (/src/models/)

- **User.ts**: Modelo de usuario con roles
- **Product.ts**: Modelo de producto
- **ShoppingItem.ts**: Modelo de item de carrito
- **Comment.ts**: Modelo de comentario

### 4.2 Rutas (/src/routes/)

- **userRoutes.ts**: Rutas de autenticación y usuarios
- **productRoutes.ts**: Rutas de productos
- **shoppingRoutes.ts**: Rutas de carrito
- **commentRoutes.ts**: Rutas de comentarios

### 4.3 Configuración (/src/config/)

- Configuraciones de base de datos
- Variables de entorno
- Middlewares globales

### 4.4 Tipos (/src/types/)

- Definiciones de tipos TypeScript
- Interfaces compartidas

---

## 5. Configuración de Entorno

### 5.1 Variables de Entorno Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### 5.2 Variables de Entorno Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
```

---

## 6. Dependencias Principales

### 6.1 Frontend (clientnpm/package.json)
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router": "^6.x",
    "axios": "^1.x",
    "typescript": "^5.x"
  },
  "devDependencies": {
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "@vitejs/plugin-react": "^4.x",
    "vite": "^4.x"
  }
}
```

### 6.2 Backend (server/package.json)
```json
{
  "dependencies": {
    "express": "^4.x",
    "mongoose": "^7.x",
    "jsonwebtoken": "^9.x",
    "bcryptjs": "^2.x",
    "cors": "^2.x",
    "dotenv": "^16.x"
  },
  "devDependencies": {
    "@types/express": "^4.x",
    "@types/node": "^18.x",
    "typescript": "^5.x",
    "ts-node": "^10.x"
  }
}
```

---

## 7. Scripts de Desarrollo

### 7.1 Frontend
```bash
npm run dev          # Desarrollo con Vite
npm run build        # Build de producción
npm run preview      # Preview del build
```

### 7.2 Backend
```bash
npm run dev          # Desarrollo con nodemon
npm run build        # Compilar TypeScript
npm start            # Ejecutar build
```

---

## 8. Estructura de Base de Datos

### 8.1 Colecciones MongoDB
- **users**: Usuarios del sistema
- **products**: Productos disponibles
- **shoppingitems**: Items en carrito
- **comments**: Comentarios de productos

### 8.2 Relaciones
- Usuario → Productos (1:N)
- Usuario → ShoppingItems (1:N)
- Usuario → Comments (1:N)
- Producto → ShoppingItems (1:N)
- Producto → Comments (1:N)

---

## 9. Flujo de Autenticación

### 9.1 Registro
1. Usuario llena formulario
2. Frontend envía datos a `/api/auth/register`
3. Backend valida y crea usuario
4. Retorna token JWT

### 9.2 Login
1. Usuario ingresa credenciales
2. Frontend envía a `/api/auth/login`
3. Backend valida y retorna token
4. Frontend almacena token en localStorage

### 9.3 Rutas Protegidas
1. Frontend incluye token en headers
2. Backend valida token con middleware
3. Si válido, permite acceso
4. Si inválido, retorna 401

---

## 10. Patrones de Diseño

### 10.1 Frontend
- **Componentes Funcionales**: Todos los componentes usan funciones
- **Hooks Personalizados**: Lógica reutilizable
- **Context API**: Estado global
- **CSS por Features**: Organización modular de estilos

### 10.2 Backend
- **MVC Pattern**: Modelos, Rutas, Controladores
- **Middleware Pattern**: Validación y autenticación
- **Repository Pattern**: Acceso a datos con Mongoose

---

## 11. Seguridad

### 11.1 Frontend
- Validación de formularios
- Sanitización de inputs
- Manejo seguro de tokens

### 11.2 Backend
- Autenticación JWT
- Validación de datos
- CORS configurado
- Variables de entorno

---

## 12. Performance

### 12.1 Frontend
- Lazy loading de componentes
- Optimización de imágenes
- CSS optimizado
- Build optimizado con Vite

### 12.2 Backend
- Índices en MongoDB
- Paginación en consultas
- Compresión de respuestas
- Caché de consultas frecuentes

---

## 13. Testing

### 13.1 Frontend
- Testing de componentes (pendiente)
- Testing de hooks (pendiente)
- Testing de integración (pendiente)

### 13.2 Backend
- Testing de rutas (pendiente)
- Testing de modelos (pendiente)
- Testing de integración (pendiente)

---

## 14. Deployment

### 14.1 Frontend (Vercel)
- Build automático desde GitHub
- Variables de entorno configuradas
- Dominio personalizado

### 14.2 Backend (Vercel)
- API routes configuradas
- Variables de entorno
- Base de datos MongoDB Atlas

---

## 15. Monitoreo y Logs

### 15.1 Frontend
- Console logs para debugging
- Error boundaries (pendiente)
- Analytics (pendiente)

### 15.2 Backend
- Logs de errores en consola
- Logs de requests
- Monitoreo de performance (pendiente) 