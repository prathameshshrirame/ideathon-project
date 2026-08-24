import React from 'react';
import { AlertTriangle, AlertOctagon, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  riskLevel: RiskLevel;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  riskLevel,
  className = '',
  size = 'md',
}) => {
  const getBadgeConfig = (level: RiskLevel) => {
    const normalized = (level || 'high').toLowerCase();
    switch (normalized) {
      case 'critical':
        return {
          containerClass: 'bg-red-600 text-white border-red-700 shadow-sm shadow-red-200 ring-2 ring-red-400/50 animate-pulse',
          dotClass: 'bg-white',
          icon: AlertOctagon,
          label: 'CRITICAL RISK',
        };
      case 'high':
        return {
          containerClass: 'bg-orange-600 text-white border-orange-700 font-extrabold shadow-sm shadow-orange-200',
          dotClass: 'bg-white',
          icon: AlertTriangle,
          label: 'HIGH RISK',
        };
      case 'medium':
      case 'moderate':
        return {
          containerClass: 'bg-amber-100 text-amber-900 border-amber-300 font-bold shadow-xs',
          dotClass: 'bg-amber-600',
          icon: AlertTriangle,
          label: 'MEDIUM RISK',
        };
      case 'low':
      default:
        return {
          containerClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold shadow-xs',
          dotClass: 'bg-emerald-600',
          icon: CheckCircle2,
          label: 'LOW RISK',
        };
    }
  };

  const config = getBadgeConfig(riskLevel);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3.5 py-1 text-xs sm:text-sm',
    lg: 'px-4 py-1.5 text-sm sm:text-base tracking-wide',
  };

  return (
    <div
      id={`risk-badge-${riskLevel.toLowerCase()}`}
      className={`inline-flex items-center gap-2 rounded-full border ${config.containerClass} ${sizeClasses[size]} ${className}`}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dotClass}`} />
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${config.dotClass}`} />
      </span>
      <Icon className="w-4 h-4 shrink-0" />
      <span className="font-extrabold tracking-wider">{config.label}</span>
    </div>
  );
};

