'use client';

// TextArea — gemelo multilínea de Input. Misma máquina de estados; la altura
// la maneja `rows` en vez de un alto fijo.

import React from 'react';
import { cn } from '../lib/cn';

type Variant = 'default' | 'neutral';

export interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
  saved?: boolean;
  error?: string;
  disabled?: boolean;
  helper?: string;
  variant?: Variant;
  className?: string;
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  readOnly = false,
  saved = false,
  error,
  disabled = false,
  helper,
  variant = 'default',
  className,
}: TextAreaProps) {
  if (variant === 'neutral') {
    let stateClass: string;
    if (disabled) {
      stateClass = 'border-2 border-transparent bg-darker-gray/50 text-darker-gray/50 placeholder:text-darker-gray/50 cursor-not-allowed';
    } else if (error) {
      stateClass = 'border-2 border-red bg-black text-white placeholder:text-divider emp-placeholder-fill focus:border-red';
    } else if (readOnly) {
      stateClass = 'border-2 border-transparent bg-black text-white cursor-default';
    } else {
      stateClass = 'border-2 border-lgray bg-black text-white placeholder:text-divider emp-placeholder-fill focus:border-blue';
    }
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <label className="font-inter font-bold text-white">{label}</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          readOnly={readOnly}
          disabled={disabled}
          className={cn('w-full px-4 py-2.5 rounded-[16px] font-inter text-base focus:outline-none transition-colors resize-none', stateClass)}
          style={{
            WebkitTextFillColor: disabled ? undefined : '#E3F2E3',
            WebkitBoxShadow: disabled ? undefined : '0 0 0 1000px #171D17 inset',
          }}
        />
        {(error || helper) && (
          <p className={cn('font-inter text-xs', error ? 'text-red' : 'text-white')}>{error || helper}</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="text-white text-sm font-semibold">
        {label}
        {error && <span className="text-magenta ml-2 font-normal">{error}</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        readOnly={readOnly}
        className={cn(
          'w-full px-4 py-1.5 border-2 rounded-2xl text-base font-shantell font-bold placeholder:font-shantell placeholder:text-white/70 placeholder:font-bold focus:outline-none transition-colors resize-none',
          error
            ? 'bg-transparent border-magenta text-white/70'
            : saved && value
              ? 'bg-white border-gray/50 text-black'
              : cn('bg-transparent focus:border-green', value ? 'text-white/70 border-blue' : 'text-white border-white'),
          readOnly && 'cursor-default opacity-70',
        )}
      />
    </div>
  );
}

export default TextArea;
