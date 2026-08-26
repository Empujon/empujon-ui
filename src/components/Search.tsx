'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconSearch, IconClearX } from './designerIcons';
import { IconButton } from './IconButton';

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

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(function Search(
  { value, onChange, placeholder = 'Buscar', disabled, className },
  ref,
) {
  const [isFocused, setIsFocused] = React.useState(false);
  const filled = value.length > 0;
  return (
    <div
      className={cn(
        'group flex h-11 w-full items-center gap-3 rounded-[16px] border-2 pl-4 pr-2 transition-colors',
        disabled
          ? 'bg-darker-gray border-divider cursor-not-allowed'
          : isFocused
            ? 'bg-black border-blue'
            : filled
              ? 'bg-black border-whitesmoke'
              : 'bg-black border-lgray hover:bg-darker-gray hover:border-blue',
        className,
      )}
    >
      <IconSearch
        className={cn(
          'size-6 shrink-0',
          disabled ? 'text-divider' : isFocused ? 'text-blue' : 'text-lightgray group-hover:text-blue',
        )}
      />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          'flex-1 min-w-0 bg-transparent font-inter font-semibold text-[16px] outline-none placeholder:font-semibold',
          disabled
            ? 'text-divider placeholder:text-divider cursor-not-allowed'
            : 'text-whitesmoke placeholder:text-lgray group-hover:placeholder:text-blue',
        )}
      />
      {filled && !disabled && (
        <IconButton
          // El glifo de designerIcons.tsx viene recortado justo al borde del
          // trazo, sin el padding que tiene dentro de su frame "Icon" de
          // 24×24 en Figma (mismo criterio que el back-icon de IconButton.stories) —
          // el trazo real ocupa ~52%/56% del casillero, por eso se dibuja a
          // ese tamaño en vez de al 100%, para igualar el tamaño óptico real.
          icon={
            <span className="flex size-full items-center justify-center">
              <IconClearX className="h-[56%] w-[52%]" />
            </span>
          }
          aria-label="Limpiar búsqueda"
          onClick={() => onChange('')}
          size="s"
          background="without"
          className="shrink-0 text-whitesmoke"
        />
      )}
    </div>
  );
});

export default Search;
