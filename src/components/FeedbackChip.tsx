'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * FeedbackChip — chip chico de correcto/incorrecto (Figma › "Cards" › "Fotoflash").
 * Hoy `iconic_memory/Feedback.tsx` hace esto a pantalla completa detectando
 * correcto/incorrecto por substring del mensaje (`.includes("correcto")`) — este es
 * el chip chico reusable que faltaba, con la variante como prop explícita en vez de
 * parsear texto.
 */
export interface FeedbackChipProps {
  variant: 'correct' | 'incorrect';
  message: string;
  className?: string;
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export function FeedbackChip({ variant, message, className }: FeedbackChipProps) {
  const correct = variant === 'correct';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill px-4 py-2 font-inter font-semibold text-[16px]',
        correct ? 'bg-green text-black' : 'bg-red text-black',
        className,
      )}
    >
      {correct ? <CheckIcon className="size-5 shrink-0" /> : <CrossIcon className="size-5 shrink-0" />}
      {message}
    </span>
  );
}

export default FeedbackChip;
