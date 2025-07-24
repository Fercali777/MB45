# 📚 Documentación del Proyecto

## 🎯 Propósito
Esta carpeta contiene toda la documentación técnica del proyecto de e-commerce de muebles, incluyendo los archivos MDC (Modelo de Datos y Componentes) que establecen las reglas y estándares de desarrollo.

## 📁 Estructura

```
docs/
├── README.md                    # Este archivo
├── mdc/                        # Archivos MDC (Modelo de Datos y Componentes)
│   ├── MDC-Data-Models.md      # Modelos de datos y reglas de negocio
│   ├── MDC-Component-Architecture.md  # Arquitectura de componentes
│   ├── MDC-API-Endpoints.md    # Documentación de API
│   └── MDC-Project-Structure.md # Estructura general del proyecto
└── .cursorrules                # Reglas específicas para Cursor AI
```

## 🚀 Cómo usar esta documentación

### Para Desarrolladores
1. **Leer primero**: `MDC-Project-Structure.md` para entender la arquitectura general
2. **Consultar**: `MDC-Component-Architecture.md` para entender los componentes
3. **Referenciar**: `MDC-API-Endpoints.md` para trabajar con la API
4. **Validar**: `MDC-Data-Models.md` para entender las reglas de negocio

### Para Cursor AI
- El archivo `.cursorrules` contiene reglas específicas que Cursor debe seguir
- Estas reglas se basan en los estándares definidos en los archivos MDC
- Cursor automáticamente aplicará estas reglas al generar código

## 📋 Reglas Principales

### Estructura de Archivos
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Base de Datos**: MongoDB + Mongoose
- **Estilos**: CSS organizado por features

### Convenciones de Código
- **Componentes**: Funcionales con hooks
- **Props**: Tipadas con TypeScript
- **Estados**: Usar hooks personalizados
- **Estilos**: CSS modular por componente

### Patrones de Diseño
- **Separación de responsabilidades**
- **Componentes reutilizables**
- **Hooks personalizados**
- **Context API para estado global**

## 🔄 Mantenimiento

### Actualizar Documentación
1. Modificar los archivos MDC correspondientes
2. Actualizar `.cursorrules` si es necesario
3. Verificar que las reglas sean consistentes

### Agregar Nuevas Funcionalidades
1. Documentar en el MDC correspondiente
2. Actualizar reglas de Cursor si es necesario
3. Mantener consistencia con patrones existentes

## 📞 Contacto
Para dudas sobre la documentación o sugerencias de mejora, consultar con el equipo de desarrollo. 