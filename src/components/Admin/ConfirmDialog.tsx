import React from 'react';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  type = 'danger',
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      icon: <ShieldAlert size={24} className="text-red-600" />,
      bg: "bg-red-100",
      button: "bg-red-600 hover:bg-red-700 text-white",
    },
    warning: {
      icon: <AlertTriangle size={24} className="text-orange-600" />,
      bg: "bg-orange-100",
      button: "bg-orange-600 hover:bg-orange-700 text-white",
    },
    info: {
      icon: <Info size={24} className="text-blue-600" />,
      bg: "bg-blue-100",
      button: "bg-blue-600 hover:bg-blue-700 text-white",
    }
  };

  const config = typeConfig[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        onClick={onCancel}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${config.bg}`}>
            {config.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
          <p className="text-slate-500 mb-8">{message}</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors"
          >
            {cancelLabel}
          </button>
          <button 
            onClick={onConfirm}
            className={`flex-1 py-2.5 px-4 font-semibold rounded-xl transition-colors ${config.button}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
