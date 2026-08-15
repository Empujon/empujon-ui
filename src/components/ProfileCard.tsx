'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * ProfileCard — card resumen de perfil (Figma › "Cards" › "Student Profile Card").
 * Avatar + nombre + slot de stats libre (`children`) — no se intentó adivinar el
 * contenido exacto de stats de Figma sin haber relevado esa parte en detalle; el
 * slot deja que cada app ponga lo que necesite (cursos, racha, progreso, etc).
 */
export interface ProfileCardProps {
  avatar: React.ReactNode;
  name: string;
  subtitle?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ProfileCard({ avatar, name, subtitle, children, onClick, className }: ProfileCardProps) {
  const Comp = onClick ? 'button' : 'div';
  return (
    <Comp
      onClick={onClick}
      className={cn(
        'flex w-full flex-col gap-4 rounded-2xl bg-darker-gray p-4 text-left transition-colors',
        onClick && 'hover:bg-blue hover:text-black',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="size-[72px] shrink-0">{avatar}</span>
        <div className="flex flex-col">
          <span className="font-shantell font-semibold text-[20px] text-whitesmoke">{name}</span>
          {subtitle && <span className="font-inter font-medium text-[14px] text-lightgray">{subtitle}</span>}
        </div>
      </div>
      {children}
    </Comp>
  );
}

export default ProfileCard;
