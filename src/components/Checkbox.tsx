'use client';

// Checkbox — checkbox estilo Empujón (cuadrado o redondo).
//
// Relleno con checkmark negro inline al marcar. Renderiza SOLO el control;
// para fila control+label usá <Choice>.

import React from 'react';
import { cn } from '../lib/cn';

export interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  size?: 'xs' | 'sm' | 'md';
  /** Tinte del estado marcado. */
  tone?: 'blue' | 'orange' | 'yellow';
  /** Forma: `square` (default) o `round` (lee como radio en single-select). */
  shape?: 'square' | 'round';
  className?: string;
}

// Checkmark negro que va dentro del checkbox marcado (32×32, escalado por size).
const CHECK_SVG = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M13.6757 26.1817C13.3469 26.1817 12.9988 26.1044 12.6313 25.9496C12.2832 25.8143 11.848 25.5725 11.3259 25.2244C10.5135 24.6828 9.73992 24.0253 9.00498 23.2516C8.28938 22.478 7.59312 21.7044 6.9162 20.9308C6.25862 20.1378 5.62038 19.4609 5.00148 18.9C4.59533 18.5519 4.3439 18.1457 4.2472 17.6815C4.15049 17.198 4.1795 16.7532 4.33423 16.347C4.50829 15.9215 4.76939 15.5734 5.11752 15.3027C5.48499 15.0125 5.91049 14.8675 6.394 14.8675C6.68411 14.8675 6.93554 14.9158 7.14828 15.0125C7.36103 15.0899 7.56411 15.2156 7.75751 15.3897C8.24103 15.7958 8.72454 16.2987 9.20806 16.8982C9.71091 17.4978 10.2331 18.107 10.7746 18.7259C11.3162 19.3448 11.8964 19.9347 12.5153 20.4956C13.1342 21.0371 13.8014 21.4723 14.517 21.8011L12.2832 21.9461C13.2502 20.2248 14.372 18.4552 15.6485 16.6372C16.9249 14.8191 18.2885 13.0205 19.739 11.2411C21.2089 9.46179 22.6884 7.77916 24.1777 6.19324C24.5838 5.76774 24.9223 5.47763 25.193 5.32291C25.4832 5.16818 25.8119 5.09082 26.1794 5.09082C26.6243 5.09082 26.9821 5.25522 27.2528 5.58401C27.5236 5.9128 27.6977 6.33829 27.775 6.86049C27.8524 7.38268 27.7944 7.95323 27.601 8.57213C27.4269 9.19102 27.0884 9.78091 26.5856 10.3418C25.5992 11.4249 24.6225 12.5563 23.6555 13.7361C22.6884 14.8965 21.7311 16.1053 20.7834 17.3624C19.8357 18.6002 18.9267 19.8767 18.0564 21.1919C17.186 22.4877 16.3641 23.8028 15.5904 25.1373C15.3584 25.5435 15.0876 25.8143 14.7781 25.9496C14.488 26.1044 14.1206 26.1817 13.6757 26.1817Z" fill="black"/>
  </svg>
`);

export function Checkbox({
  checked,
  onChange,
  disabled = false,
  ariaLabel = 'Seleccionar',
  size = 'md',
  tone = 'blue',
  shape = 'square',
  className,
}: CheckboxProps) {
  const roundedClass =
    shape === 'round' ? 'rounded-full' : size === 'md' ? 'rounded-[10px]' : 'rounded-[6px]';
  const sizeBoxClass = size === 'xs' ? 'w-6 h-6' : size === 'sm' ? 'w-7 h-7' : 'w-11 h-11';
  const checkBgSize = size === 'xs' ? '16px 16px' : size === 'sm' ? '18px 18px' : '28px 28px';

  let stateClasses: string;
  if (tone === 'yellow') {
    if (disabled) {
      stateClasses = checked ? 'border-divider bg-divider' : 'border-divider bg-transparent';
    } else if (checked) {
      stateClasses = 'border-yellow bg-yellow hover:border-blue group-hover:border-blue';
    } else {
      stateClasses = 'border-white bg-transparent hover:border-blue group-hover:border-blue';
    }
  } else if (checked) {
    stateClasses = tone === 'orange' ? 'border-orange bg-orange' : 'border-blue bg-blue';
  } else {
    stateClasses = 'border-white bg-transparent hover:bg-white/5';
  }

  const disabledClass =
    tone === 'yellow' ? 'disabled:cursor-default' : 'disabled:cursor-default disabled:opacity-50';

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn('appearance-none flex-shrink-0 cursor-pointer transition-colors border-2', roundedClass, sizeBoxClass, disabledClass, stateClasses, className)}
      style={
        checked
          ? {
              backgroundImage: `url("data:image/svg+xml,${CHECK_SVG}")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: checkBgSize,
            }
          : undefined
      }
    />
  );
}

export default Checkbox;
