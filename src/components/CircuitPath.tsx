'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * CircuitPath — mapa de progreso gamificado por nodos (Figma › "Casilleros circuito" /
 * "Training Circuit Node"). Gap 100% nuevo Y sin ninguna referencia: confirmado que no
 * existe en ningún repo entrenador (fluidez_lectora/turbo/granpaneo/iconic_memory) —
 * "circuito" ahí es solo metadata de sesión, nunca se construyó la UI. Esta es una
 * primera versión genérica desde cero, sin nada para validar contra — probarla bien
 * antes de que una app la adopte.
 */
export type CircuitNodeStatus = 'locked' | 'unavailable' | 'available' | 'in-progress' | 'completed';

export interface CircuitNodeItem {
  key: string;
  status: CircuitNodeStatus;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface CircuitPathProps {
  nodes: CircuitNodeItem[];
  className?: string;
}

const nodeColor: Record<CircuitNodeStatus, string> = {
  locked: 'bg-divider text-gray-700',
  unavailable: 'bg-darker-gray text-gray-700 border-2 border-divider',
  available: 'bg-black text-whitesmoke border-2 border-green',
  'in-progress': 'bg-blue text-black',
  completed: 'bg-orange text-black',
};

const LockIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function CircuitPath({ nodes, className }: CircuitPathProps) {
  return (
    <div className={cn('flex items-center', className)}>
      {nodes.map((node, i) => (
        <React.Fragment key={node.key}>
          {i > 0 && <span className="h-1 w-8 shrink-0 bg-divider" />}
          <button
            type="button"
            onClick={node.onClick}
            disabled={node.status === 'locked' || node.status === 'unavailable'}
            aria-label={`${node.key}: ${node.status}`}
            className={cn(
              'flex size-[64px] shrink-0 items-center justify-center rounded-2xl transition-colors',
              nodeColor[node.status],
              node.status === 'in-progress' && 'animate-pulse',
              (node.status === 'locked' || node.status === 'unavailable') && 'cursor-not-allowed',
            )}
          >
            {node.status === 'locked' ? (
              <LockIcon className="size-6" />
            ) : node.status === 'completed' ? (
              <CheckIcon className="size-6" />
            ) : (
              node.icon
            )}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

export default CircuitPath;
