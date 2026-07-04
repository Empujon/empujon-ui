'use client';

// Navbar — cáscara presentacional del "pill flotante" superior de Empujón.
//
// SIN lógica: no sabe de auth, roles ni chat. Es sólo la forma visual del header
// (el rectángulo redondeado flotante con [logo | acciones] arriba y un menú
// desplegable debajo). Toda la lógica (qué logo, qué acciones, qué items de menú,
// cuánto se encoge por el chat) vive en empujón y entra por slots + `style`.
//
// Arquitectura acordada: "cáscara + slots + width por prop".
//  - La lib da la forma y la apertura del menú por CSS (transición de max-height,
//    sin framer-motion — que la lib NO tiene como dependencia).
//  - Empujón controla ancho / posición / z-index / animación por `style` desde
//    afuera (donde vive la lógica del push del chat Chatama).

import React from 'react';
import { cn } from '../lib/cn';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Slot izquierdo: el logo (empujón inyecta el isotipo/logotipo con su onClick). */
  logo: React.ReactNode;
  /** Slot derecho: acciones (hamburguesa, botón "Ingresar", etc.). */
  actions?: React.ReactNode;
  /** Slot del menú desplegable (curtain) que aparece debajo cuando `menuOpen`. */
  menu?: React.ReactNode;
  /** Si el menú está abierto (controla la transición de altura y el overlay). */
  menuOpen?: boolean;
  /** Click en el overlay de fondo (empujón lo usa para cerrar el menú). */
  onOverlayClick?: () => void;
  /** Paleta: dark = header interno; brand = header landing. */
  variant?: 'dark' | 'brand';
  /** Alto de la fila superior en px (interno 72, landing 84). */
  height?: number;
  /** Muestra el overlay oscuro de fondo cuando el menú está abierto. Default true. */
  showOverlay?: boolean;
  /** z-index del overlay (empujón lo eleva cuando está `inOverlay`). */
  overlayZIndex?: number;
}

export function Navbar({
  logo,
  actions,
  menu,
  menuOpen = false,
  onOverlayClick,
  variant = 'dark',
  height = 72,
  showOverlay = true,
  overlayZIndex,
  className,
  style,
  ...props
}: NavbarProps) {
  const palette =
    variant === 'brand' ? 'bg-orange text-black' : 'bg-dark-gray text-white';

  return (
    <>
      {showOverlay && menuOpen && (
        <div
          onClick={onOverlayClick}
          style={overlayZIndex != null ? { zIndex: overlayZIndex } : undefined}
          className={cn(
            'fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
            overlayZIndex == null && 'z-[10000]',
          )}
          aria-hidden
        />
      )}

      <header
        style={style}
        className={cn(
          'px-6 fixed top-0 left-1/2 -translate-x-1/2 rounded-b-[24px] flex flex-col overflow-hidden',
          palette,
          className,
        )}
        {...props}
      >
        {/* Fila superior: [logo | acciones]. Alto fijo, no se comprime. */}
        <div
          className="w-full flex justify-between items-center flex-shrink-0"
          style={{ height }}
        >
          {logo}
          {actions}
        </div>

        {/* Menú desplegable: apertura suave por CSS (max-height + opacity), sin framer. */}
        {menu != null && (
          <div
            className={cn(
              'w-full overflow-hidden transition-all duration-300 ease-in-out',
              menuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            {menu}
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
