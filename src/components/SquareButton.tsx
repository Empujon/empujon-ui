'use client';

import React from 'react';
import { cn } from '../lib/cn';

/** SquareButton — botón grande de acción con label + bajada opcional (Figma › "Special shape" › "Square Button"). */
export interface SquareButtonProps {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SquareButton({ label, description, icon, selected, disabled, onClick, className }: SquareButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        'flex items-center gap-4 rounded-[16px] p-4 text-left transition-colors',
        disabled
          ? 'border-[3px] border-divider text-divider'
          : selected
            ? 'border-[3px] border-blue bg-orange text-black'
            : 'bg-orange text-black hover:bg-blue',
        className,
      )}
    >
      {icon && <span className="size-[70px] shrink-0">{icon}</span>}
      <div className="flex flex-1 flex-col gap-2">
        <span className="font-shantell font-semibold text-[24px] tracking-[0.24px]">{label}</span>
        {description && <span className="font-inter font-semibold text-[16px] tracking-[0.16px]">{description}</span>}
      </div>
    </button>
  );
}

export default SquareButton;
