import React from 'react';
import { EmergencyCategory } from '../types';
import { ChevronRight, ArrowUpRight } from 'lucide-react';

interface EmergencyCardProps {
  category: EmergencyCategory;
  title: string;
  subtitle?: string;
  icon: string;
  tag?: string;
  isSelected?: boolean;
  onClick: () => void;
  id?: string;
  themeColor?: 'red' | 'amber' | 'blue' | 'emerald' | 'purple' | 'slate';
}

export const EmergencyCard: React.FC<EmergencyCardProps> = ({
  category,
  title,
  subtitle,
  icon,
  tag,
  isSelected = false,
  onClick,
  id,
  themeColor = 'red',
}) => {
  const getThemeStyles = () => {
    switch (themeColor) {
      case 'red':
        return {
          cardBg: 'bg-slate-900/90 hover:bg-slate-850',
          border: 'border-slate-800 hover:border-red-500/60',
          selectedBorder: 'border-red-500 bg-red-950/40 ring-2 ring-red-500/40 shadow-lg shadow-red-950/50',
          glow: 'group-hover:shadow-red-500/10',
          titleColor: 'text-white group-hover:text-red-300',
          iconBg: 'bg-red-950/80 border-red-800/60 text-red-400',
          tagBg: 'bg-red-950 text-red-400 border-red-800/60',
        };
      case 'amber':
        return {
          cardBg: 'bg-slate-900/90 hover:bg-slate-850',
          border: 'border-slate-800 hover:border-amber-500/60',
          selectedBorder: 'border-amber-500 bg-amber-950/40 ring-2 ring-amber-500/40 shadow-lg shadow-amber-950/50',
          glow: 'group-hover:shadow-amber-500/10',
          titleColor: 'text-white group-hover:text-amber-300',
          iconBg: 'bg-amber-950/80 border-amber-800/60 text-amber-400',
          tagBg: 'bg-amber-950 text-amber-400 border-amber-800/60',
        };
      case 'blue':
        return {
          cardBg: 'bg-slate-900/90 hover:bg-slate-850',
          border: 'border-slate-800 hover:border-sky-500/60',
          selectedBorder: 'border-sky-500 bg-sky-950/40 ring-2 ring-sky-500/40 shadow-lg shadow-sky-950/50',
          glow: 'group-hover:shadow-sky-500/10',
          titleColor: 'text-white group-hover:text-sky-300',
          iconBg: 'bg-sky-950/80 border-sky-800/60 text-sky-400',
          tagBg: 'bg-sky-950 text-sky-400 border-sky-800/60',
        };
      case 'emerald':
        return {
          cardBg: 'bg-slate-900/90 hover:bg-slate-850',
          border: 'border-slate-800 hover:border-emerald-500/60',
          selectedBorder: 'border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-950/50',
          glow: 'group-hover:shadow-emerald-500/10',
          titleColor: 'text-white group-hover:text-emerald-300',
          iconBg: 'bg-emerald-950/80 border-emerald-800/60 text-emerald-400',
          tagBg: 'bg-emerald-950 text-emerald-400 border-emerald-800/60',
        };
      case 'purple':
        return {
          cardBg: 'bg-slate-900/90 hover:bg-slate-850',
          border: 'border-slate-800 hover:border-purple-500/60',
          selectedBorder: 'border-purple-500 bg-purple-950/40 ring-2 ring-purple-500/40 shadow-lg shadow-purple-950/50',
          glow: 'group-hover:shadow-purple-500/10',
          titleColor: 'text-white group-hover:text-purple-300',
          iconBg: 'bg-purple-950/80 border-purple-800/60 text-purple-400',
          tagBg: 'bg-purple-950 text-purple-400 border-purple-800/60',
        };
      default:
        return {
          cardBg: 'bg-slate-900/90 hover:bg-slate-850',
          border: 'border-slate-800 hover:border-slate-500/60',
          selectedBorder: 'border-slate-400 bg-slate-800 ring-2 ring-slate-400/40 shadow-lg',
          glow: 'group-hover:shadow-slate-500/10',
          titleColor: 'text-white group-hover:text-slate-200',
          iconBg: 'bg-slate-800 border-slate-700 text-slate-300',
          tagBg: 'bg-slate-800 text-slate-300 border-slate-700',
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <button
      id={id || `card-emergency-${category}`}
      type="button"
      onClick={onClick}
      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-150 relative group cursor-pointer overflow-hidden ${
        isSelected ? theme.selectedBorder : `${theme.cardBg} ${theme.border}`
      }`}
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl sm:text-2xl border shrink-0 transition-transform group-hover:scale-105 shadow-inner ${theme.iconBg}`}
          >
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-sm sm:text-base font-black tracking-tight leading-snug transition-colors ${theme.titleColor}`}>
                {title}
              </h3>
            </div>
            {subtitle && (
              <p className="text-xs text-slate-400 font-medium line-clamp-1 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {tag && (
          <span
            className={`hidden sm:inline-flex text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${theme.tagBg}`}
          >
            {tag}
          </span>
        )}
      </div>

      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-slate-500 group-hover:text-slate-300 transition-colors">
        <span className="font-mono uppercase tracking-wider text-[10px]">Crisis Instructions</span>
        <div className="flex items-center gap-0.5 text-slate-400 group-hover:text-white">
          <span>View Steps</span>
          <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </button>
  );
};
