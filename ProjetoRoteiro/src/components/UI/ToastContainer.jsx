import React from 'react';
import { useToast } from '../../contexts/ToastContext';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';
import './Toast.css';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast glass animate-slide-up toast-${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' && <CheckCircle2 size={24} color="#2B593F" />}
            {toast.type === 'error' && <AlertCircle size={24} color="#e63946" />}
            {toast.type === 'info' && <Info size={24} color="#0A1B28" />}
          </div>
          <p className="toast-message">{toast.message}</p>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
