'use client';

// CurtainMenu — menú desplegable presentacional de Empujón.
//
// SIN lógica de roles/auth/navegación: recibe los items ya resueltos por props.
// Empujón calcula (según login + RoleGrant) qué items van y a dónde, y los pasa.
//
// - `items`: entradas primarias (tarjeta verde en desktop, lista en mobile).
// - `adminItems`: entradas secundarias (tarjeta translúcida en desktop).
// - `footer`: slot inferior (empujón inyecta el botón "Cerrar sesión").
//
// El icono de cada item es un ReactNode (empujón inyecta su <Image>/<svg>), o
// una letra de fallback si no hay icono.

import React from 'react';
import { cn } from '../lib/cn';

export interface CurtainMenuItem {
  label: string;
  /** Icono ya renderizado (empujón inyecta su <Image>/<svg>). */
  icon?: React.ReactNode;
  /** Letra de fallback si no hay icono. */
  letter?: string;
  onClick?: () => void;
}

export interface CurtainMenuProps {
  items: CurtainMenuItem[];
  /** Entradas secundarias (panel admin), estilo translúcido. */
  adminItems?: CurtainMenuItem[];
  /** Slot inferior (típicamente el botón de logout). */
  footer?: React.ReactNode;
  /** Controla la opacidad de entrada (par del `menuOpen` del Navbar). */
  open?: boolean;
  className?: string;
}

function LetterIcon({ letter }: { letter: string }) {
  return (
    <div className="w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center font-shantell font-bold text-black text-2xl lg:text-3xl">
      {letter}
    </div>
  );
}

export function CurtainMenu({ items, adminItems = [], footer, open = true, className }: CurtainMenuProps) {
  return (
    <div
      className={cn(
        'w-full flex flex-col items-center justify-center pt-20 pb-4 transition-opacity duration-200',
        open ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      {/* Desktop: grid de tarjetas */}
      <div className="hidden md:grid grid-cols-5 gap-x-4 lg:gap-x-6 gap-y-4">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="bg-[#E5F5E0] hover:bg-blue rounded-2xl w-24 h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center transition-colors duration-200 shadow-sm p-2"
          >
            <div className="relative w-8 h-8 lg:w-12 lg:h-12 mb-2 lg:mb-3 flex items-center justify-center">
              {item.icon ?? <LetterIcon letter={item.letter || '?'} />}
            </div>
            <span className="text-black font-bold text-sm lg:text-base text-center leading-tight px-1">
              {item.label}
            </span>
          </button>
        ))}
        {adminItems.map((item, index) => (
          <button
            key={`admin-${index}`}
            onClick={item.onClick}
            className="bg-[#E5F5E0] border-2 border-blue hover:bg-blue rounded-2xl w-24 h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center transition-colors duration-200 shadow-sm p-2"
          >
            <div className="relative w-8 h-8 lg:w-12 lg:h-12 mb-2 lg:mb-3 flex items-center justify-center">
              {item.icon ?? (
                <span className="text-black font-extrabold text-2xl lg:text-3xl">{item.letter}</span>
              )}
            </div>
            <span className="text-black font-bold text-sm lg:text-base text-center leading-tight px-1">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Mobile: lista */}
      <div className="md:hidden flex flex-col space-y-6 items-center w-full px-6">
        {[...items, ...adminItems].map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="text-white font-bold text-xl underline decoration-wavy underline-offset-[6px]"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Slot inferior (logout) */}
      {footer != null && (
        <div className="w-full mt-24 px-6 flex justify-center md:justify-end">{footer}</div>
      )}
    </div>
  );
}

export default CurtainMenu;
