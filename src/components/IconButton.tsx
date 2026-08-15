'use client';

import React from 'react';
import { cn } from '../lib/cn';

/** IconButton — botón circular solo-ícono (Figma › "Special shape" › "Icon Button"). */
export interface IconButtonProps {
  icon: React.ReactNode;
  'aria-label': string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function IconButton({ icon, onClick, disabled, className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={rest['aria-label']}
      className={cn(
        'flex size-11 items-center justify-center rounded-pill bg-darker-gray text-whitesmoke transition-colors enabled:hover:bg-blue enabled:hover:text-black disabled:opacity-40 disabled:cursor-not-allowed',
        className,
      )}
    >
      <span className="size-6">{icon}</span>
    </button>
  );
}

export default IconButton;
