import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import './Toast.css';

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast slide-up" role="alert" aria-live="assertive">
      <CheckCircle2 size={18} className="toast-icon" aria-hidden="true" />
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default Toast;
