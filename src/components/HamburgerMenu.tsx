'use client';

// HamburgerMenu — botón hamburguesa presentacional de Empujón (3 barras).
// Portado 1:1 desde empujón; presentacional puro.

import React from 'react';
import { cn } from '../lib/cn';

export interface HamburgerMenuProps {
  bgColor?: 'black' | 'orange';
  lineColor?: 'black' | 'orange';
}

export function HamburgerMenu({ bgColor = 'black', lineColor = 'orange' }: HamburgerMenuProps) {
  const backgroundClass = bgColor === 'black' ? 'bg-black' : 'bg-orange';
  const lineClass = lineColor === 'black' ? 'bg-black' : 'bg-orange';
  const hoverBackgroundClass = lineColor === 'black' ? 'hover:bg-black' : 'hover:bg-orange';
  const hoverLineClass = bgColor === 'black' ? 'group-hover:bg-black' : 'group-hover:bg-orange';

  return (
    <div
      className={cn(
        'w-16 h-24 rounded-b-xl flex flex-col justify-start items-center pt-10 space-y-2 transition-colors duration-200 group',
        backgroundClass,
        hoverBackgroundClass,
      )}
    >
      <div className={cn('w-8 h-1 rounded-tr-md rounded-br-md transition-colors duration-200', lineClass, hoverLineClass)} />
      <div className={cn('w-8 h-1 rounded-tl-md rounded-bl-md transition-colors duration-200', lineClass, hoverLineClass)} />
      <div className={cn('w-8 h-1 rounded-tl-md rounded-tr-md transition-colors duration-200', lineClass, hoverLineClass)} />
    </div>
  );
}

export default HamburgerMenu;
