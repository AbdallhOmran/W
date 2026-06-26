import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const SIZE_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-xl',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-7xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal-content ${SIZE_CLASSES[size]} animate-scale-in`}>
        <div className="modal-header">
          <h2 className="text-lg font-bold text-secondary-900">{title}</h2>
          <button
            onClick={onClose}
            className="btn-ghost btn-icon rounded-xl text-secondary-400 hover:text-secondary-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

// Confirm Dialog
interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  variant = 'danger',
  loading = false,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const confirmClass = variant === 'danger' ? 'btn-danger' : variant === 'warning' ? 'btn-warning' : 'btn-primary';

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content max-w-md animate-scale-in">
        <div className="modal-header">
          <h2 className="text-lg font-bold text-secondary-900">{title}</h2>
        </div>
        <div className="modal-body">
          <p className="text-secondary-600">{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary" disabled={loading}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className={confirmClass} disabled={loading}>
            {loading ? (
              <div className="w-4 h-4 spinner" />
            ) : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
