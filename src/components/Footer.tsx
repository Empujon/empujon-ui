'use client';

// Footer — pie de página presentacional de Empujón.
// Fiel al Figma "SISTEMA DE DISEÑO" › Footer (node 4037:25707): fila de links,
// divisor, copyright + botón "Volver arriba". Device=Desktop/Mobile es un
// único componente responsive (md:), no dos variantes separadas.

import React from 'react';
import { cn } from '../lib/cn';
import { Button } from './Button';
import { IconChevronUp } from './designerIcons';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  links: FooterLink[];
  /** Texto de copyright. Default: "Empujón © <año actual>. Todos los derechos reservados." */
  copyright?: string;
  /** Label del botón "volver arriba". Default 'Volver arriba'. */
  backToTopLabel?: string;
  /** Oculta el botón "volver arriba". Default false (visible, como en el Figma). */
  hideBackToTop?: boolean;
  /** Click del botón "volver arriba". Default: scroll suave al top de la página. */
  onBackToTop?: () => void;
  /** Fijo al fondo en desktop (md+). Default true (par visual del header landing). */
  fixed?: boolean;
  /**
   * Clase para cada link. Si la app tiene su propio estilo de link (p.ej. la
   * clase `.footer-link` de empujón con cursor custom), la pasa acá y reemplaza
   * el estilo por defecto de la lib.
   */
  linkClassName?: string;
}

export function Footer({
  links,
  copyright,
  backToTopLabel = 'Volver arriba',
  hideBackToTop = false,
  onBackToTop,
  fixed = true,
  linkClassName,
  className,
  ...props
}: FooterProps) {
  const handleBackToTop = () => {
    if (onBackToTop) {
      onBackToTop();
      return;
    }
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={cn(
        'bg-orange text-black flex w-full flex-col items-center gap-6 rounded-t-card px-4 py-6 md:px-6',
        fixed && 'static md:fixed md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:w-3/4',
        className,
      )}
      {...props}
    >
      <nav className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-start md:gap-20">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className={
              linkClassName ??
              'inline-flex h-11 items-center justify-center whitespace-nowrap font-inter text-label-chico font-semibold text-black hover:underline hover:decoration-wavy hover:underline-offset-4'
            }
          >
            {l.label}
          </a>
        ))}
      </nav>

      <hr className="h-px w-full shrink-0 border-0 bg-darker-gray" />

      <div className="flex w-full flex-col items-center gap-6 md:flex-row md:justify-between">
        <p className="font-inter text-label-mini font-medium text-black">
          {copyright ?? `Empujón © ${new Date().getFullYear()}. Todos los derechos reservados.`}
        </p>
        {!hideBackToTop && (
          <Button variant="primary-light" size="sm" icon={<IconChevronUp />} iconPosition="right" onClick={handleBackToTop}>
            {backToTopLabel}
          </Button>
        )}
      </div>
    </footer>
  );
}

export default Footer;
