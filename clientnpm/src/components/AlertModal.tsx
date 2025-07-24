import React from 'react';
import './alert-modal.css';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: AlertType;
  title: string;
  message: string;
  showCloseButton?: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  showCloseButton = true
}) => {
  if (!isOpen) return null;

  const getAlertConfig = (type: AlertType) => {
    switch (type) {
      case 'success':
        return {
          icon: '/img/alert-circle.png',
          bgClass: 'bg-success',
          textClass: 'text-success',
          borderClass: 'border-success'
        };
      case 'error':
        return {
          icon: '/img/alert-circle.png',
          bgClass: 'bg-danger',
          textClass: 'text-danger',
          borderClass: 'border-danger'
        };
      case 'warning':
        return {
          icon: '/img/bell-outline.png',
          bgClass: 'bg-warning',
          textClass: 'text-warning',
          borderClass: 'border-warning'
        };
      case 'info':
        return {
          icon: '/img/bell-outline.png',
          bgClass: 'bg-info',
          textClass: 'text-info',
          borderClass: 'border-info'
        };
      default:
        return {
          icon: '/img/chat-alert.png',
          bgClass: 'bg-info',
          textClass: 'text-info',
          borderClass: 'border-info'
        };
    }
  };

  const config = getAlertConfig(type);

  return (
    <>
      {/* Overlay con fondo borroso y oscuro */}
      <div 
        className="backdrop show d-block "
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="modal show d-block"
        style={{ zIndex: 1050 }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered alert-modal-dialog">
          <div className={`modal-content-mb  alert-modal-content`}>
            {/* Header */}
            <div  className={`${config.bgClass} modal-header-bar`}></div>
            
            <div className='modal-box-mb'>
            <div className={`modal-header-MB`}>
            {config.icon.endsWith('.png') ? (
                  <img src={config.icon} alt="alert icon" className="alert-modal-icon" style={{ width: 24, height: 24 }} />
                ) : (
                  <span className="alert-modal-icon">{config.icon}</span>
                )}
                              {showCloseButton && (
                <button
                  type="button"
                  className="btn-close-up"
                  onClick={onClose}
                  aria-label="Close"
                />
              )}
              </div>

             
            
            
            {/* Body */}
            <div className="modal-body-MB ">
            <h2 className="modal-title mb-0 ">{title}</h2>
              <p className="mb-0">{message}</p>
            </div>
            </div>
            


          </div>
        </div>
      </div>
    </>
  );
};

export default AlertModal; 