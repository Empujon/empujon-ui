'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconSearch, IconClearX } from './designerIcons';

/**
 * Search — input de búsqueda (Figma › "Search"). Gap 100% nuevo.
 *
 * Estados: default/hover (placeholder), focus/filled (muestra el valor + botón de
 * limpiar), disabled. El ícono de lupa y la "x" de limpiar son los glifos reales de
 * Figma (normalizados a currentColor para heredar el color por estado).
 */
export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Search({ value, onChange, placeholder = 'Buscar', disabled, className }: SearchProps) {
  const filled = value.length > 0;
  return (
    <div
      className={cn(
        'group flex h-11 w-full items-center gap-3 rounded-[16px] border-2 px-4 transition-colors',
        disabled
          ? 'bg-divider border-gray-700 cursor-not-allowed'
          : filled
            ? 'bg-black border-whitesmoke'
            : 'bg-black border-lgray hover:bg-darker-gray hover:border-blue focus-within:bg-black focus-within:border-blue',
        className,
      )}
    >
      <IconSearch
        className={cn(
          'size-6 shrink-0',
          disabled ? 'text-gray-700' : filled ? 'text-lgray' : 'text-lgray group-hover:text-blue group-focus-within:text-lgray',
        )}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'flex-1 min-w-0 bg-transparent font-inter font-semibold text-[16px] outline-none placeholder:font-semibold',
          disabled
            ? 'text-gray-700 placeholder:text-gray-700 cursor-not-allowed'
            : 'text-whitesmoke placeholder:text-lgray group-hover:placeholder:text-blue',
        )}
      />
      {filled && !disabled && (
        <button type="button" aria-label="Limpiar búsqueda" onClick={() => onChange('')} className="shrink-0">
          <IconClearX className="size-6 text-whitesmoke" />
        </button>
      )}
    </div>
  );
}

export default Search;
