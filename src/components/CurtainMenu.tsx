'use client';

// CurtainMenu — menú desplegable presentacional de Empujón.
//
// SIN lógica de roles/auth/navegación: recibe los items ya resueltos por props.
// Empujón calcula (según login + RoleGrant) qué items van y a dónde, y los pasa.
// Pensado para ir directo en el slot `menu` del Navbar (el mismo `md:` — 768px
// — que ya usa Navbar para el corte Desktop/Mobile de este Header).
//
// Fiel al Figma "SISTEMA DE DISEÑO" › Header (node 7414:3329) y a su
// "header menu button" (node 6147:4722, estados Default/Hover/Active/Focus):
// - `items`: entradas primarias (tarjeta blanca 160px en desktop, lista en mobile).
// - `adminItems`: entradas secundarias — misma tarjeta, con borde celeste fijo.
// - `footer`: slot inferior (empujón inyecta el botón "Cerrar sesión").
//
// El icono de cada item es un ReactNode (empujón inyecta su <Image>/<svg>, ya
// en `currentColor` para heredar el color del botón en cada estado), o una
// letra de fallback si no hay icono.

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
  /** Entradas secundarias (panel admin) — misma tarjeta, con borde celeste fijo. */
  adminItems?: CurtainMenuItem[];
  /** Slot inferior (típicamente el botón de logout). */
  footer?: React.ReactNode;
  /** Controla la opacidad de entrada (par del `menuOpen` del Navbar). */
  open?: boolean;
  className?: string;
}

function LetterIcon({ letter }: { letter: string }) {
  return (
    <div className="size-12 flex items-center justify-center font-shantell font-bold text-3xl">
      {letter}
    </div>
  );
}

// "header menu button": blanca por default, celeste en hover, oscura+borde
// celeste en activo (texto/ícono pasan a blanco), borde celeste en foco. El
// borde transparente se reserva siempre para que el foco/admin no corran el
// layout al aparecer.
function MenuButton({
  icon,
  letter,
  label,
  onClick,
  admin = false,
}: {
  icon?: React.ReactNode;
  letter?: string;
  label: string;
  onClick?: () => void;
  admin?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-40 h-40 shrink-0 rounded-3xl flex flex-col items-center justify-center gap-2.5 py-8',
        'bg-whitesmoke text-black border-[3px] transition-colors duration-200',
        'hover:bg-blue active:bg-darker-gray active:text-whitesmoke active:border-blue',
        'focus-visible:outline-none focus-visible:border-blue',
        admin ? 'border-blue' : 'border-transparent',
      )}
    >
      <span className="size-12 flex items-center justify-center">
        {icon ?? <LetterIcon letter={letter || '?'} />}
      </span>
      <span className="font-inter font-semibold text-label-medio text-center">{label}</span>
    </button>
  );
}

function MobileMenuItem({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-11 w-full flex items-center justify-center font-inter font-semibold text-label-chico text-whitesmoke',
        'hover:[text-decoration-line:underline] hover:[text-decoration-style:wavy] hover:underline-offset-4',
      )}
    >
      {children}
    </button>
  );
}

export function CurtainMenu({ items, adminItems = [], footer, open = true, className }: CurtainMenuProps) {
  return (
    <div
      className={cn(
        'w-full flex flex-col gap-6 transition-opacity duration-200',
        open ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      {/* Desktop: grilla de tarjetas */}
      <div className="hidden md:flex flex-wrap justify-center gap-6">
        {items.map((item, index) => (
          <MenuButton key={index} icon={item.icon} letter={item.letter} label={item.label} onClick={item.onClick} />
        ))}
        {adminItems.map((item, index) => (
          <MenuButton
            key={`admin-${index}`}
            icon={item.icon}
            letter={item.letter}
            label={item.label}
            onClick={item.onClick}
            admin
          />
        ))}
      </div>

      {/* Mobile: lista de texto */}
      <div className="flex flex-col md:hidden">
        {[...items, ...adminItems].map((item, index) => (
          <MobileMenuItem key={index} onClick={item.onClick}>
            {item.label}
          </MobileMenuItem>
        ))}
      </div>

      {/* Slot inferior (logout) */}
      {footer != null && <div className="w-full flex justify-center md:justify-end">{footer}</div>}
    </div>
  );
}

export default CurtainMenu;
