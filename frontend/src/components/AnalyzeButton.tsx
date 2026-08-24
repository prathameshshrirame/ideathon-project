import React from 'react';
import { AlertTriangle, ArrowRight, LucideIcon } from 'lucide-react';

interface AnalyzeButtonProps {
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit';
  variant?: 'primary-emergency' | 'secondary-dark' | 'outline';
  label?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({
  id = 'btn-analyze',
  onClick,
  type = 'submit',
  variant = 'primary-emergency',
  label,
  icon: Icon,
  disabled = false,
  className = '',
  fullWidth = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary-emergency':
        return 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold shadow-lg shadow-red-200';
      case 'secondary-dark':
        return 'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold shadow-sm';
      case 'outline':
        return 'bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-300 font-semibold shadow-xs';
    }
  };

  const defaultIcon = variant === 'primary-emergency' ? AlertTriangle : ArrowRight;
  const ResolvedIcon = Icon || defaultIcon;
  const defaultLabel = variant === 'primary-emergency' ? 'HELP ME NOW' : 'Analyze Situation';

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-3.5 px-6 rounded-full text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        fullWidth ? 'w-full' : ''
      } ${getVariantStyles()} ${className}`}
    >
      <ResolvedIcon className="w-5 h-5" />
      <span>{label || defaultLabel}</span>
    </button>
  );
};
