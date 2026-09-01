'use client';

import React from 'react';
import { cn } from '../lib/cn';

// Forma de "estampilla" (Figma › "Cards" › "Fotoflash", node 7701:1831,
// capa "estampilla") — el mismo path en los 3 estados, solo cambia
// fill+opacity: blanco 100% (Default) o blanco 70% (Hover/Active, tiñe el bg
// de color del botón). Calcado 1:1 del SVG exportado, no aproximado.
const STAMP_PATH =
  'M408.471 0C401.194 0 395.294 5.90553 395.294 13.1898C395.294 20.4741 389.395 26.3796 382.118 26.3796C374.841 26.3796 368.941 20.4741 368.941 13.1898C368.941 5.90553 363.042 0 355.765 0C348.488 0 342.588 5.90553 342.588 13.1898C342.588 20.4741 336.689 26.3796 329.412 26.3796C322.135 26.3796 316.235 20.4741 316.235 13.1898C316.235 5.90553 310.336 0 303.059 0C295.782 0 289.882 5.90553 289.882 13.1898C289.882 20.4741 283.983 26.3796 276.706 26.3796C269.429 26.3796 263.529 20.4741 263.529 13.1898C263.529 5.90553 257.63 0 250.353 0C243.076 0 237.176 5.90553 237.176 13.1898C237.176 20.4741 231.277 26.3796 224 26.3796C216.723 26.3796 210.824 20.4741 210.824 13.1898C210.824 5.90553 204.924 0 197.647 0C190.37 0 184.471 5.90553 184.471 13.1898C184.471 20.4741 178.571 26.3796 171.294 26.3796C164.017 26.3796 158.118 20.4741 158.118 13.1898C158.118 5.90553 152.218 0 144.941 0C137.664 0 131.765 5.90553 131.765 13.1898C131.765 20.4741 125.865 26.3796 118.588 26.3796C111.311 26.3796 105.412 20.4741 105.412 13.1898C105.412 5.90553 99.5122 0 92.2353 0C84.9584 0 79.0588 5.90553 79.0588 13.1898C79.0588 20.4741 73.1593 26.3796 65.8824 26.3796C58.6054 26.3796 52.7059 20.4741 52.7059 13.1898C52.7059 5.90553 46.8063 0 39.5294 0C32.2525 0 26.3529 5.90553 26.3529 13.1898C26.3529 20.4741 20.4534 26.3796 13.1765 26.3796C5.89956 26.3796 0 32.2852 0 39.5695C0 46.8537 5.89956 52.7593 13.1765 52.7593C20.4534 52.7593 26.3529 58.6648 26.3529 65.9491C26.3529 73.2334 20.4534 79.1389 13.1765 79.1389C5.89956 79.1389 0 85.0445 0 92.3287C0 99.613 5.89956 105.519 13.1765 105.519C20.4534 105.519 26.3529 111.424 26.3529 118.708C26.3529 125.993 20.4534 131.898 13.1765 131.898C5.89956 131.898 0 137.804 0 145.088C0 152.372 5.89956 158.278 13.1765 158.278C20.4534 158.278 26.3529 164.183 26.3529 171.468C26.3529 178.752 32.2525 184.657 39.5294 184.657C46.8063 184.657 52.7059 178.752 52.7059 171.468C52.7059 164.183 58.6054 158.278 65.8824 158.278C73.1593 158.278 79.0588 164.183 79.0588 171.468C79.0588 178.752 84.9584 184.657 92.2353 184.657C99.5122 184.657 105.412 178.752 105.412 171.468C105.412 164.183 111.311 158.278 118.588 158.278C125.865 158.278 131.765 164.183 131.765 171.468C131.765 178.752 137.664 184.657 144.941 184.657C152.218 184.657 158.118 178.752 158.118 171.468C158.118 164.183 164.017 158.278 171.294 158.278C178.571 158.278 184.471 164.183 184.471 171.468C184.471 178.752 190.37 184.657 197.647 184.657C204.924 184.657 210.824 178.752 210.824 171.468C210.824 164.183 216.723 158.278 224 158.278C231.277 158.278 237.176 164.183 237.176 171.468C237.176 178.752 243.076 184.657 250.353 184.657C257.63 184.657 263.529 178.752 263.529 171.468C263.529 164.183 269.429 158.278 276.706 158.278C283.983 158.278 289.882 164.183 289.882 171.468C289.882 178.752 295.782 184.657 303.059 184.657C310.336 184.657 316.235 178.752 316.235 171.468C316.235 164.183 322.135 158.278 329.412 158.278C336.689 158.278 342.588 164.183 342.588 171.468C342.588 178.752 348.488 184.657 355.765 184.657C363.042 184.657 368.941 178.752 368.941 171.468C368.941 164.183 374.841 158.278 382.118 158.278C389.395 158.278 395.294 164.183 395.294 171.468C395.294 178.752 401.194 184.657 408.471 184.657C415.747 184.657 421.647 178.752 421.647 171.468C421.647 164.183 427.547 158.278 434.824 158.278C442.1 158.278 448 152.372 448 145.088C448 137.804 442.1 131.898 434.824 131.898C427.547 131.898 421.647 125.993 421.647 118.708C421.647 111.424 427.547 105.519 434.824 105.519C442.1 105.519 448 99.613 448 92.3287C448 85.0445 442.1 79.1389 434.824 79.1389C427.547 79.1389 421.647 73.2334 421.647 65.9491C421.647 58.6648 427.547 52.7593 434.824 52.7593C442.1 52.7593 448 46.8537 448 39.5695C448 32.2852 442.1 26.3796 434.824 26.3796C427.547 26.3796 421.647 20.4741 421.647 13.1898C421.647 5.90553 415.747 0 408.471 0Z';

/**
 * FotoflashCard — card de palabra del aplicativo Fotoflash, forma de
 * estampilla (Figma › "Cards" › "Fotoflash", node 7701:1831). Eje: `word`
 * (correct/incorrect) × estado (default/hover/active).
 *
 * "Active" acá es selección persistente (igual criterio que `ImageCard`), no
 * el `:active` de mouse: representa la card ya elegida en el juego de
 * emparejar, coloreada verde si `word="correct"` o magenta si `word="incorrect"`.
 * Controlable (`active` + `onClick`) para coordinar selección desde afuera.
 *
 * Sin `disabled`: Figma trae ese estado en el component set, pero no tiene
 * aplicación real en el producto — se sacó del componente, no solo de la story.
 *
 * Ancho responsive: `w-full max-w-[464px]` — 464px es el tamaño de Figma,
 * pero por debajo de ese ancho la card se achica junto con su contenedor (la
 * página pone el margen de 16px por lado, no la card, mismo criterio que
 * ProfileCard). El alto sigue la proporción de Figma vía `aspect-ratio` en
 * vez de quedar fijo en 200px, así se achica proporcionalmente y no queda
 * angosta y alta en mobile.
 *
 * Nota: en el ejemplo de Figma, `word="incorrect"` hardcodea el texto
 * "palabra" en vez de usar la prop editable (que ahí solo aplica a
 * "correct") — se ve como un atajo del mockup, no una regla real: acá `text`
 * siempre manda para los dos, así una card incorrecta también puede mostrar
 * su propia palabra en vez de quedar pegada a un placeholder fijo.
 */
export interface FotoflashCardProps {
  /** Palabra mostrada en la card. */
  text?: string;
  /** A qué color pasa la card al activarse: verde si es la correcta, magenta si es un distractor. */
  word?: 'correct' | 'incorrect';
  /** Controlado: si se pasa, el toggle interno se ignora. */
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FotoflashCard({ text = 'intangente', word = 'correct', active, onClick, className }: FotoflashCardProps) {
  const [internalActive, setInternalActive] = React.useState(false);
  const isControlled = active !== undefined;
  const isActive = isControlled ? active : internalActive;

  const handleClick = () => {
    if (!isControlled) setInternalActive((prev) => !prev);
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'group relative aspect-[464/200] w-full max-w-[464px] rounded-card border-[3px] border-black drop-shadow-[0px_0px_20px_rgba(0,0,0,0.5)] transition-colors duration-200 ease-in-out',
        isActive ? (word === 'incorrect' ? 'bg-magenta' : 'bg-green') : 'bg-lightgray hover:bg-blue',
        className,
      )}
    >
      <svg
        viewBox="0 0 448 184.657"
        preserveAspectRatio="none"
        className="absolute inset-2"
        aria-hidden="true"
      >
        <path
          d={STAMP_PATH}
          className={cn('fill-whitesmoke', isActive ? 'fill-whitesmoke/70' : 'group-hover:fill-whitesmoke/70')}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center px-10 text-center font-inter font-semibold text-[48px] tracking-[0.48px] text-black">
        {text}
      </span>
    </button>
  );
}

export default FotoflashCard;
