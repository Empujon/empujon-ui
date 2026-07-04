'use client';

// Footer — pie de página presentacional de Empujón (fila de links).
// Sin lógica: recibe los links por props. La app decide qué links y a dónde.

import React from 'react';
import { cn } from '../lib/cn';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  links: FooterLink[];
  /** Fijo al fondo en desktop (md+). Default true (par visual del header landing). */
  fixed?: boolean;
  /**
   * Clase para cada link. Si la app tiene su propio estilo de link (p.ej. la
   * clase `.footer-link` de empujón con cursor custom), la pasa acá y reemplaza
   * el estilo por defecto de la lib.
   */
  linkClassName?: string;
}

export function Footer({ links, fixed = true, linkClassName, className, ...props }: FooterProps) {
  return (
    <footer
      className={cn(
        'bg-orange text-black py-6 px-6 rounded-t-lg w-full',
        fixed && 'static md:fixed md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:w-3/4',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-around">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className={
              linkClassName ??
              'min-w-[120px] text-center font-inter font-bold transition-all hover:no-underline underline-offset-4 hover:font-shantell'
            }
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
