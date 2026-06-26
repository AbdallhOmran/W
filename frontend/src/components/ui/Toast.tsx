import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface ToastContextValue {
  toasts: Toast[];
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: Toast['type'], message: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{
      toasts,
      success: (msg) => addToast('success', msg),
      error: (msg) => addToast('error', msg),
      warning: (msg) => addToast('warning', msg),
      info: (msg) => addToast('info', msg),
      dismiss,
    }}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

const ICONS = {
  success: <CheckCircle className="w-5 h-5 text-success-600" />,
  error: <XCircle className="w-5 h-5 text-danger-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-warning-500" />,
  info: <Info className="w-5 h-5 text-primary-500" />,
};

const COLORS = {
  success: 'border-success-500 bg-success-50',
  error: 'border-danger-500 bg-danger-50',
  warning: 'border-warning-500 bg-warning-50',
  info: 'border-primary-500 bg-primary-50',
};

const ToastContainer: React.FC<{ toasts: Toast[]; dismiss: (id: string) => void }> = ({ toasts, dismiss }) => (
  <div className="fixed bottom-4 left-4 z-[100] flex flex-col gap-2 max-w-sm w-full no-print">
    {toasts.map(toast => (
      <div
        key={toast.id}
        className={`flex items-start gap-3 p-4 rounded-xl shadow-elevated border-r-4 animate-slide-in ${COLORS[toast.type]}`}
      >
        {ICONS[toast.type]}
        <p className="text-sm font-semibold text-secondary-800 flex-1">{toast.message}</p>
        <button onClick={() => dismiss(toast.id)} className="text-secondary-400 hover:text-secondary-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    ))}
  </div>
);
