# AlertModal Component

Un componente de alerta modal reutilizable que muestra mensajes con diferentes tipos de alertas.

## Características

- ✅ **4 tipos de alertas**: éxito, error, advertencia, informativo
- 🎨 **Diseño moderno**: Fondo borroso y oscuro
- 📱 **Responsive**: Se adapta a diferentes tamaños de pantalla
- ⚡ **Animaciones suaves**: Transiciones y efectos visuales
- 🔧 **Fácil de usar**: Hook personalizado incluido

## Tipos de Alertas

| Tipo | Color | Icono | Uso |
|------|-------|-------|-----|
| `success` | Verde | ✅ | Operaciones exitosas |
| `error` | Rojo | ❌ | Errores y problemas |
| `warning` | Amarillo | ⚠️ | Advertencias |
| `info` | Azul | ℹ️ | Información general |

## Uso Básico

### 1. Importar el hook y componente

```tsx
import { useAlertModal } from '../hooks/useAlertModal';
import AlertModal from './AlertModal';
```

### 2. Usar en tu componente

```tsx
const MyComponent = () => {
  const { alertState, showSuccess, showError, hideAlert } = useAlertModal();

  const handleSuccess = () => {
    showSuccess("¡Éxito!", "La operación se completó correctamente.");
  };

  const handleError = () => {
    showError("Error", "Algo salió mal.");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Mostrar Éxito</button>
      <button onClick={handleError}>Mostrar Error</button>
      
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={hideAlert}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
      />
    </div>
  );
};
```

## Métodos Disponibles

### `useAlertModal()` hook

```tsx
const {
  alertState,      // Estado actual del modal
  showAlert,       // Método genérico
  hideAlert,       // Cerrar modal
  showSuccess,     // Mostrar alerta de éxito
  showError,       // Mostrar alerta de error
  showWarning,     // Mostrar alerta de advertencia
  showInfo         // Mostrar alerta informativa
} = useAlertModal();
```

### Métodos de conveniencia

```tsx
// Éxito
showSuccess("Título", "Mensaje de éxito");

// Error
showError("Título", "Mensaje de error");

// Advertencia
showWarning("Título", "Mensaje de advertencia");

// Información
showInfo("Título", "Mensaje informativo");
```

## Props del AlertModal

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `isOpen` | `boolean` | ✅ | Controla si el modal está visible |
| `onClose` | `() => void` | ✅ | Función para cerrar el modal |
| `type` | `AlertType` | ✅ | Tipo de alerta (success/error/warning/info) |
| `title` | `string` | ✅ | Título del modal |
| `message` | `string` | ✅ | Mensaje del modal |
| `showCloseButton` | `boolean` | ❌ | Mostrar botón X (default: true) |

## Ejemplo Completo

```tsx
import React from 'react';
import { useAlertModal } from '../hooks/useAlertModal';
import AlertModal from './AlertModal';

const ExampleComponent = () => {
  const { 
    alertState, 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo, 
    hideAlert 
  } = useAlertModal();

  const handleAsyncOperation = async () => {
    try {
      // Simular operación asíncrona
      await someAsyncFunction();
      showSuccess("¡Completado!", "La operación se realizó con éxito.");
    } catch (error) {
      showError("Error", "No se pudo completar la operación.");
    }
  };

  return (
    <div>
      <div className="d-flex gap-2">
        <button 
          className="btn btn-success" 
          onClick={() => showSuccess("Éxito", "Operación completada")}
        >
          Éxito
        </button>
        
        <button 
          className="btn btn-danger" 
          onClick={() => showError("Error", "Algo salió mal")}
        >
          Error
        </button>
        
        <button 
          className="btn btn-warning" 
          onClick={() => showWarning("Advertencia", "Ten cuidado")}
        >
          Advertencia
        </button>
        
        <button 
          className="btn btn-info" 
          onClick={() => showInfo("Info", "Información importante")}
        >
          Info
        </button>
      </div>

      <AlertModal
        isOpen={alertState.isOpen}
        onClose={hideAlert}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
      />
    </div>
  );
};
```

## Personalización

El componente usa Bootstrap CSS y clases personalizadas. Puedes modificar los estilos en `AlertModal.css` para adaptarlo a tu diseño.

## Características Técnicas

- **Fondo borroso**: `backdrop-filter: blur(8px)`
- **Animaciones**: CSS transitions y keyframes
- **Responsive**: Media queries para móviles
- **Accesibilidad**: ARIA labels y keyboard navigation
- **Z-index**: Configurado para aparecer sobre otros elementos 