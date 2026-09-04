import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  IconMiniMedicionDefault,
  IconMiniMedicionUnavailable,
  IconMiniMedicionLate,
  IconMiniMedicionCompleted,
  IconMiniTurboDefault,
  IconMiniTurboUnavailable,
  IconMiniTurboLate,
  IconMiniTurboCompleted,
  IconMiniFotoflashDefault,
  IconMiniFotoflashUnavailable,
  IconMiniFotoflashLate,
  IconMiniFotoflashCompleted,
  IconMiniGranpaneoDefault,
  IconMiniGranpaneoUnavailable,
  IconMiniGranpaneoLate,
  IconMiniGranpaneoCompleted,
  IconMiniWaiting,
  IconMiniComplete,
} from './designerIcons';

const meta: Meta = {
  title: 'Componentes/CircuitPath',
};
export default meta;
type Story = StoryObj;

const COLUMNS = ['Default', 'Unavailable', 'Late', 'Completed'];

// Grid real (no flex + padding a mano) para que las 4 columnas de status
// queden siempre alineadas con sus labels, sin importar el largo del texto.
// Ojo: `grid-cols-[16rem_repeat(4,2.75rem)]` como clase de Tailwind rompe el
// parseo (la coma dentro de `repeat()` corta el valor arbitrario a la mitad),
// por eso el template de columnas va en `style` en vez de className.
const GRID = 'grid items-center gap-6';
const GRID_STYLE: React.CSSProperties = { gridTemplateColumns: '16rem repeat(4, 2.75rem)' };

// Figma "Casilleros minimal" (Training Circuit Node Mini, node-id 7732-2753):
// versión chica y plana de los glifos del circuito, sin el chrome de tarjeta
// del casillero grande — 4 apps × 4 statuses + 2 genéricos (Waiting/Complete).
// Cada ícono ya trae su paleta fija por status, no hay hover/active acá.
export const CircuitNodeMinimal: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-black p-10">
      <div className={GRID} style={GRID_STYLE}>
        <span className="font-inter text-sm text-lightgray">Medición de lectura</span>
        <IconMiniMedicionDefault className="size-11" />
        <IconMiniMedicionUnavailable className="size-11" />
        <IconMiniMedicionLate className="size-11" />
        <IconMiniMedicionCompleted className="size-11" />
      </div>
      <div className={GRID} style={GRID_STYLE}>
        <span className="font-inter text-sm text-lightgray">Entrenador TurboLectura</span>
        <IconMiniTurboDefault className="size-11" />
        <IconMiniTurboUnavailable className="size-11" />
        <IconMiniTurboLate className="size-11" />
        <IconMiniTurboCompleted className="size-11" />
      </div>
      <div className={GRID} style={GRID_STYLE}>
        <span className="font-inter text-sm text-lightgray">Entrenador Fotoflash</span>
        <IconMiniFotoflashDefault className="size-11" />
        <IconMiniFotoflashUnavailable className="size-11" />
        <IconMiniFotoflashLate className="size-11" />
        <IconMiniFotoflashCompleted className="size-11" />
      </div>
      <div className={GRID} style={GRID_STYLE}>
        <span className="font-inter text-sm text-lightgray">Entrenador Granpaneo</span>
        <IconMiniGranpaneoDefault className="size-11" />
        <IconMiniGranpaneoUnavailable className="size-11" />
        <IconMiniGranpaneoLate className="size-11" />
        <IconMiniGranpaneoCompleted className="size-11" />
      </div>
      <div className={GRID} style={GRID_STYLE}>
        <span className="font-inter text-sm text-lightgray">Genéricos (sin app)</span>
        <IconMiniWaiting className="size-11" />
        <IconMiniComplete className="size-11" />
        <span />
        <span />
      </div>
      <div className={GRID} style={GRID_STYLE}>
        <span />
        {COLUMNS.map((label) => (
          <span key={label} className="text-center font-inter text-xs text-lightgray">
            {label}
          </span>
        ))}
      </div>
    </div>
  ),
};
