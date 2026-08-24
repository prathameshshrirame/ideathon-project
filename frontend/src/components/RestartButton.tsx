import React from 'react';
import { RotateCcw } from 'lucide-react';

interface RestartButtonProps {
  onClick: () => void;
  id?: string;
  label?: string;
  variant?: 'outline' | 'pill' | 'ghost';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RestartButton: React.FC<RestartButtonProps> = ({
  onClick,
  id = 'btn-restart-assessment',
  label = 'New Assessment',
  variant = 'pill',
  className = '',
  size = 'md',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'pill':
        return 'bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 text-slate-800 rounded-full font-bold shadow-xs';
      case 'outline':
        return 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg font-semibold shadow-xs';
      case 'ghost':
        return 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-xs';
      case 'lg':
        return 'py-3.5 px-6 text-sm sm:text-base';
      case 'md':
      default:
        return 'py-2.5 px-5 text-sm';
    }
  };

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    >
      <RotateCcw className="w-4 h-4 text-slate-600" />
      <span>{label}</span>
    </button>
  );
};
