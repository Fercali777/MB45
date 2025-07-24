import { useState } from 'react';
import { AlertType } from '../components/AlertModal';

interface AlertModalState {
  isOpen: boolean;
  type: AlertType;
  title: string;
  message: string;
}

export const useAlertModal = () => {
  const [alertState, setAlertState] = useState<AlertModalState>({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  });

  const showAlert = (type: AlertType, title: string, message: string) => {
    setAlertState({
      isOpen: true,
      type,
      title,
      message
    });
  };

  const hideAlert = () => {
    setAlertState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  // Métodos de conveniencia para cada tipo de alerta
  const showSuccess = (title: string, message: string) => {
    showAlert('success', title, message);
  };

  const showError = (title: string, message: string) => {
    showAlert('error', title, message);
  };

  const showWarning = (title: string, message: string) => {
    showAlert('warning', title, message);
  };

  const showInfo = (title: string, message: string) => {
    showAlert('info', title, message);
  };

  return {
    alertState,
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}; 