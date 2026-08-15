'use client';

import React from 'react';
import { cn } from '../lib/cn';

/** RoundButton — botón circular con ícono + label opcional en hover (Figma › "Special shape" › "Round Button"). */
export interface RoundButtonProps {
  icon: React.ReactNode;
  label?: string;
  size?: 'sm' | 'md';
  onClick?: () => void;
  className?: string;
}

export function RoundButton({ icon, label, size = 'sm', onClick, className }: RoundButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={cn(
        'group flex items-center gap-2 overflow-hidden rounded-pill bg-darker-gray p-4 text-whitesmoke transition-colors hover:bg-blue hover:text-black hover:pr-4',
        size === 'sm' ? 'size-8' : 'size-11',
        className,
      )}
    >
      <span className={cn('shrink-0', size === 'sm' ? 'size-6' : 'size-6')}>{icon}</span>
      {label && (
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-inter font-semibold text-[16px] tracking-[0.16px] transition-all group-hover:max-w-[200px]">
          {label}
        </span>
      )}
    </button>
  );
}

export default RoundButton;
