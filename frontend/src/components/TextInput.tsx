import React from 'react';
import { AlertCircle } from 'lucide-react';

interface TextInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  id = 'emergency-text-input',
  value,
  onChange,
  placeholder = 'Example: Kitchen stove fire with thick smoke spreading to cabinets...',
  label,
  error,
  rows = 3,
  className = '',
  disabled = false,
  autoFocus = false,
}) => {
  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className={`w-full p-4 bg-slate-950 hover:bg-slate-925 focus:bg-slate-950 border rounded-2xl resize-none focus:outline-none focus:ring-2 placeholder:text-slate-500 text-white text-sm sm:text-base font-medium transition ${
            error
              ? 'border-red-500 focus:ring-red-500/40 bg-red-950/20'
              : 'border-slate-800 focus:border-red-500 focus:ring-red-500/20'
          }`}
        />
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-400 font-bold">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
