'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { Tooltip } from './Tooltip';

/**
 * TrainingCircuitNode — casillero de progreso gamificado (Figma › "Casilleros circuito" ›
 * "Training Circuit Node", node 7414:6374). Reconstruido 1:1 contra el component set real
 * (52 variantes: 5 apps × 3 estados × hasta 6 niveles de acceso). Separado de `CircuitPath`
 * (que sigue siendo el placeholder viejo, sin tocar — ver ese archivo) porque esto todavía
 * se está construyendo paso a paso.
 *
 * `access` es el eje real de Figma:
 * - `locked`: cadena sin abrir. Sin interacción, ícono de candado fijo.
 * - `unavailable`: revelado pero todavía no disponible (ej. "disponible este jueves").
 * - `available`: se puede empezar/entrenar ahora.
 * - `in-progress`: ya se está cursando (ícono de reloj de arena fijo).
 * - `completed-repeat`: completado, se puede repetir la actividad (naranja).
 * - `completed-no-repeat`: completado, cierre definitivo (verde).
 *
 * El ícono de app (`icon`) es un slot — cada app real trae su propio glifo ilustrado
 * multicolor. `locked` e `in-progress` son fijos (candado, reloj de arena: genéricos,
 * compartidos por todas las apps en Figma).
 *
 * El estado "toggle (al clickear)" de Figma son instancias reales del Interactive
 * Tooltip (`Tooltip.tsx`) — confirmado por Rocío, que lo dejó explícito en Figma.
 * Clickear un nodo interactivo togglea mostrar/ocultar ese tooltip anclado a la
 * derecha (`arrow="left"`), con la acción primaria (Comenzar/Entrenar/Repetir)
 * cuando corresponde.
 */
export type CircuitAccess =
  | 'locked'
  | 'unavailable'
  | 'available'
  | 'in-progress'
  | 'completed-repeat'
  | 'completed-no-repeat';

export interface TrainingCircuitNodeProps {
  access: CircuitAccess;
  /**
   * Ícono/ilustración de la app. Se ignora en `locked` e `in-progress` (glifos
   * fijos de Figma). Acepta una función `({ open }) => ReactNode` para íconos
   * que necesitan verse "activos" (celeste) mientras el tooltip está togliado,
   * no solo en hover real — ver `IconGlifoAplicativoFluidez` / prop `active`.
   */
  icon?: React.ReactNode | ((ctx: { open: boolean }) => React.ReactNode);
  /** Nombre de la app, título del tooltip al togglear (ej. "Entrenador Fotoflash"). */
  appName?: string;
  /** Segunda línea del tooltip (ej. "Sesión 1 - Disponible este jueves"). */
  statusText?: string;
  /** Label de la acción primaria del tooltip (ej. "Comenzar" / "Entrenar" / "Repetir"). Sin esto, el tooltip no muestra botón. */
  actionLabel?: string;
  onAction?: () => void;
  onClick?: () => void;
  className?: string;
}

const LockIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 59.2636 82" fill="none" className={className} aria-hidden="true">
    <path
      d="M56.587 36.9699C55.5516 35.937 54.1178 35.2972 52.5373 35.2972H46.8109V35.2766H35.3582V35.2835H23.9055V35.2903H12.4527V35.2972H6.72636C5.14589 35.2972 3.71201 35.937 2.67668 36.9699C1.64135 38.0028 1 39.4333 1 41.01V75.294C1.00458 78.4475 3.56541 81 6.72636 81H12.4527V80.9931H23.9055V80.9863H35.3582V80.9794H46.8109V81H52.5373C54.1178 81 55.5516 80.3602 56.587 79.3273C57.6223 78.2944 58.2636 76.8639 58.2636 75.2871V41.01C58.2636 39.4333 57.6223 38.0028 56.587 36.9699ZM35.3582 52.422C35.3582 53.9988 34.7168 55.427 33.6815 56.4622C32.6462 57.495 31.2123 58.1349 29.6318 58.1349C31.2123 58.1349 32.6462 58.7747 33.6815 59.8076C34.7145 60.8382 35.3559 62.2664 35.3582 63.8409V63.8477C35.3582 65.4245 34.7168 66.8527 33.6815 67.8879C32.6462 68.9207 31.2123 69.5606 29.6318 69.5606C26.4709 69.5606 23.91 67.0058 23.9055 63.8546V63.8477C23.9055 62.271 24.5468 60.8405 25.5821 59.8076C26.6175 58.7747 28.0513 58.1349 29.6318 58.1349C26.4709 58.1349 23.91 55.5801 23.9055 52.4289V52.422C23.9055 50.8453 24.5468 49.4148 25.5821 48.3819C26.6175 47.349 28.0513 46.7092 29.6318 46.7092C31.2123 46.7092 32.6462 47.349 33.6815 48.3819C34.7145 49.4125 35.3559 50.8407 35.3582 52.4152V52.422Z"
      fill="#252924"
    />
    <path
      d="M29.6318 58.1349C31.2123 58.1349 32.6462 57.495 33.6815 56.4622C34.7168 55.427 35.3582 53.9988 35.3582 52.422V52.4152C35.3559 50.8407 34.7145 49.4125 33.6815 48.3819C32.6462 47.349 31.2123 46.7092 29.6318 46.7092C28.0513 46.7092 26.6175 47.349 25.5821 48.3819C24.5468 49.4148 23.9055 50.8453 23.9055 52.422V52.4289C23.91 55.5801 26.4709 58.1349 29.6318 58.1349ZM29.6318 58.1349C31.2123 58.1349 32.6462 58.7747 33.6815 59.8076C34.7145 60.8382 35.3559 62.2664 35.3582 63.8409V63.8477C35.3582 65.4245 34.7168 66.8527 33.6815 67.8879C32.6462 68.9207 31.2123 69.5606 29.6318 69.5606C26.4709 69.5606 23.91 67.0058 23.9055 63.8546V63.8477C23.9055 62.271 24.5468 60.8405 25.5821 59.8076C26.6175 58.7747 28.0513 58.1349 29.6318 58.1349ZM56.587 36.9699C55.5516 35.937 54.1178 35.2972 52.5373 35.2972H46.8109V35.2766H35.3582V35.2835H23.9055V35.2903H12.4527V35.2972H6.72636C5.14589 35.2972 3.71201 35.937 2.67668 36.9699C1.64135 38.0028 1 39.4333 1 41.01V75.294C1.00458 78.4475 3.56541 81 6.72636 81H12.4527V80.9931H23.9055V80.9863H35.3582V80.9794H46.8109V81H52.5373C54.1178 81 55.5516 80.3602 56.587 79.3273C57.6223 78.2944 58.2636 76.8639 58.2636 75.2871V41.01C58.2636 39.4333 57.6223 38.0028 56.587 36.9699Z"
      stroke="#F4F5F5"
      strokeWidth="2"
    />
    <path
      d="M46.8096 6.71285V35.2771H35.3569V18.1386C35.3569 16.5641 34.7132 15.1359 33.6802 14.1053C32.6449 13.0724 31.211 12.4326 29.6305 12.4326C28.0501 12.4326 26.6162 13.0724 25.5808 14.1053C24.5455 15.1382 23.9042 16.5687 23.9042 18.1454V35.2908H12.4514V6.72656C12.4514 5.14753 13.0928 3.7216 14.1281 2.68643C15.1634 1.65355 16.5973 1.01371 18.1778 1.01371H23.9042V1.00686H35.3569V1H41.0833C42.6637 1 44.0976 1.63984 45.1329 2.67272C46.1683 3.70789 46.8096 5.13382 46.8096 6.71285Z"
      fill="#E3F2E3"
      fillOpacity="0.7"
      stroke="#F4F5F5"
      strokeWidth="2"
    />
  </svg>
);

const HourglassIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 80.0034" fill="none" className={className} aria-hidden="true">
    <path
      d="M5.71387 1H74.2861C76.8893 1.00023 78.9998 3.11068 79 5.71387C79 8.31725 76.8895 10.4285 74.2861 10.4287C70.578 10.4287 67.5714 13.4345 67.5713 17.1426C67.5713 19.746 65.4608 21.8573 62.8574 21.8574C59.1494 21.8574 56.1427 24.8633 56.1426 28.5713C56.1426 31.1748 54.0322 33.2861 51.4287 33.2861C47.7206 33.2861 44.7139 36.2919 44.7139 40C44.7139 43.7081 47.7206 46.7139 51.4287 46.7139C54.0322 46.7139 56.1426 48.8252 56.1426 51.4287C56.1427 55.1367 59.1494 58.1426 62.8574 58.1426C65.4608 58.1427 67.5713 60.254 67.5713 62.8574C67.5714 66.5655 70.578 69.5713 74.2861 69.5713C76.8895 69.5715 79 71.6828 79 74.2861C78.9998 76.8893 76.8893 78.9998 74.2861 79H5.71387C3.11068 78.9998 1.00023 76.8893 1 74.2861C1 71.6828 3.11054 69.5715 5.71387 69.5713C9.42197 69.5713 12.4286 66.5655 12.4287 62.8574C12.4287 60.254 14.5392 58.1427 17.1426 58.1426C20.8506 58.1426 23.8573 55.1367 23.8574 51.4287C23.8574 48.8252 25.9678 46.7139 28.5713 46.7139C32.2794 46.7139 35.2861 43.7081 35.2861 40C35.2861 36.2919 32.2794 33.2861 28.5713 33.2861C25.9678 33.2861 23.8574 31.1748 23.8574 28.5713C23.8573 24.8633 20.8506 21.8574 17.1426 21.8574C14.5392 21.8573 12.4287 19.746 12.4287 17.1426C12.4286 13.4345 9.42197 10.4287 5.71387 10.4287C3.11054 10.4285 1 8.31725 1 5.71387C1.00023 3.11068 3.11068 1.00023 5.71387 1Z"
      fill="#F4F5F5"
      stroke="#171D17"
      strokeWidth="2"
    />
    <path
      d="M5.71387 1H74.2861C76.8893 1.00023 78.9998 3.11068 79 5.71387C79 8.31725 76.8895 10.4285 74.2861 10.4287H5.71387C3.11054 10.4285 1 8.31725 1 5.71387C1.00023 3.11068 3.11068 1.00023 5.71387 1Z"
      fill="#F79045"
      stroke="#171D17"
      strokeWidth="2"
    />
    <path
      d="M5.71387 69.5747H74.2861C76.8893 69.5749 78.9998 71.6853 79 74.2885C79 76.8919 76.8895 79.0031 74.2861 79.0034H5.71387C3.11054 79.0031 1 76.8919 1 74.2885C1.00023 71.6853 3.11068 69.5749 5.71387 69.5747Z"
      fill="#F79045"
      stroke="#171D17"
      strokeWidth="2"
    />
  </svg>
);

/**
 * Borde/fondo/sombra por nivel de acceso — idle (Default, real `hover:` adentro)
 * vs open (toggle clickeado, muestra el tooltip). `completed-repeat` NO lleva
 * `shadow-naranja` a diferencia de `available` — confirmado que ninguna de las
 * 4 apps trae esa clase en el código de Figma para este access level (`available`
 * sí la trae en las 4), no es la misma card con un brillo "de menos".
 */
const NODE_STYLE: Record<CircuitAccess, { idle: string; hover: string; open: string }> = {
  locked: { idle: 'border-whitesmoke bg-darker-gray', hover: '', open: '' },
  unavailable: {
    idle: 'border-whitesmoke bg-darker-gray',
    hover: 'hover:border-blue',
    open: 'border-blue bg-darker-gray',
  },
  available: {
    idle: 'border-orange bg-whitesmoke shadow-naranja',
    hover: '',
    open: 'border-orange bg-darker-gray shadow-naranja',
  },
  'in-progress': {
    idle: 'border-whitesmoke bg-darker-gray',
    hover: 'hover:border-orange',
    open: 'border-yellow bg-black',
  },
  'completed-repeat': {
    idle: 'border-green bg-whitesmoke',
    hover: '',
    open: 'border-green bg-darker-gray',
  },
  'completed-no-repeat': {
    idle: 'border-green bg-darker-gray',
    hover: 'hover:border-blue',
    open: 'border-darker-gray bg-green',
  },
};

/**
 * Color del `icon` cuando usa `currentColor` para su hover REAL (ej.
 * `IconGlifoAplicativoFluidez`, cuyo punto central y trazo festoneado siguen
 * el color de texto en vez de traer uno propio). Va acá y no en cada uso del
 * ícono — es una regla del ESTADO del nodo, no algo que cada consumidor deba
 * acordarse de repetir con `group-hover:`. El estado "open" (toggle
 * clickeado) NO se resuelve acá — ese es persistente (no depende de seguir
 * hovereando) y lo maneja el propio ícono vía su prop `active`, pasada desde
 * afuera con la variante función de `icon` (`({ open }) => ...`).
 */
const ICON_COLOR: Partial<Record<CircuitAccess, string>> = {
  unavailable: 'text-whitesmoke group-hover:text-blue',
};

/**
 * Color de la burbuja del tooltip por nivel de acceso — los 2 "completado"
 * (`completed-repeat` y `completed-no-repeat`) la traen verde en Figma
 * (bg-verde-300, confirmado en el código real de la instancia "Active" de
 * cada uno), el resto blanca. No es una preferencia estética: cada access
 * level define su propio color de burbuja.
 */
const TOOLTIP_COLOR: Partial<Record<CircuitAccess, 'white' | 'green'>> = {
  'completed-repeat': 'green',
  'completed-no-repeat': 'green',
};

export function TrainingCircuitNode({
  access,
  icon,
  appName,
  statusText,
  actionLabel,
  onAction,
  onClick,
  className,
}: TrainingCircuitNodeProps) {
  const [open, setOpen] = React.useState(false);
  const canInteract = access !== 'locked';
  const hasTooltip = Boolean(appName || statusText || actionLabel);
  const style = NODE_STYLE[access];

  const handleClick = () => {
    if (!canInteract) return;
    if (hasTooltip) setOpen((prev) => !prev);
    onClick?.();
  };

  const glyph =
    access === 'locked' ? (
      <LockIcon className="size-20" />
    ) : access === 'in-progress' ? (
      <HourglassIcon className="size-20" />
    ) : typeof icon === 'function' ? (
      icon({ open })
    ) : (
      icon
    );

  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <button
        type="button"
        onClick={handleClick}
        disabled={!canInteract}
        aria-label={`${appName ?? access}: ${access}`}
        aria-expanded={hasTooltip ? open : undefined}
        className={cn(
          'group flex size-[104px] shrink-0 items-center justify-center rounded-[16px] border-2 transition-colors duration-200 ease-in-out',
          canInteract ? 'cursor-pointer' : 'cursor-not-allowed',
          open ? style.open : cn(style.idle, canInteract && style.hover),
        )}
      >
        <span className={cn('flex size-20 shrink-0 items-center justify-center', ICON_COLOR[access])}>{glyph}</span>
      </button>
      {open && hasTooltip && (
        <span className="absolute left-full top-1/2 z-10 ml-2 -translate-y-1/2">
          <Tooltip
            message={appName ?? ''}
            description={statusText}
            arrow="left"
            color={TOOLTIP_COLOR[access] ?? 'white'}
            onPrimaryAction={actionLabel ? onAction : undefined}
            primaryActionLabel={actionLabel}
          />
        </span>
      )}
    </span>
  );
}

export default TrainingCircuitNode;
