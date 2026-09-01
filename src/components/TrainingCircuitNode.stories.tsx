import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TrainingCircuitNode } from './TrainingCircuitNode';
import {
  IconGlifoAplicativoFluidez,
  IconGlifoAplicativoFluidezAvailable,
  IconGlifoAplicativoFluidezCompleted,
  IconMemotestFotoflash,
} from './designerIcons';

const meta: Meta<typeof TrainingCircuitNode> = {
  title: 'Componentes/CircuitPath',
  component: TrainingCircuitNode,
};
export default meta;
type Story = StoryObj<typeof TrainingCircuitNode>;

// Los 6 niveles de acceso de Figma, uno por fila (yendo ajustándolos de a uno).
// Hover es interacción real — pasá el mouse. El "state: toggle" de Figma es el
// Interactive Tooltip real (`Tooltip.tsx`): clickeá un nodo interactivo para
// abrirlo/cerrarlo (Locked no reacciona, no tiene nada para mostrar).
export const Casillero: Story = {
  render: () => (
    <div className="flex flex-col gap-8 bg-black p-10">
      <Row label="Elemento Bloqueado (aún no se ha abierto cadena)">
        <TrainingCircuitNode access="locked" />
      </Row>
      <Row label="Elemento revelado pero no disponible">
        <TrainingCircuitNode
          access="unavailable"
          icon={({ open }) => <IconGlifoAplicativoFluidez className="size-full" active={open} />}
          appName="Medición de lectura"
          statusText="Inicial - Disponible este jueves"
        />
      </Row>
      <Row label="Elemento disponible">
        <TrainingCircuitNode
          access="available"
          icon={({ open }) => <IconGlifoAplicativoFluidezAvailable className="size-full" active={open} />}
          appName="Medición de lectura"
          statusText="Inicial - Disponible"
          actionLabel="Comenzar"
          onAction={() => {}}
        />
      </Row>
      <Row label="Elemento en procesamiento (waiting)">
        <TrainingCircuitNode
          access="in-progress"
          appName="Entrenador TurboLectura"
          statusText="Sesión 1 - En curso"
        />
      </Row>
      <Row label="Elemento Completado (se puede repetir actividad)">
        <TrainingCircuitNode
          access="completed-repeat"
          icon={<IconMemotestFotoflash className="size-full" />}
          appName="Entrenador Fotoflash"
          statusText="Sesión 1 - Completada"
          actionLabel="Repetir"
          onAction={() => {}}
        />
      </Row>
      <Row label="Elemento Completado (NO se puede repetir actividad)">
        <TrainingCircuitNode
          access="completed-no-repeat"
          icon={({ open }) => <IconGlifoAplicativoFluidezCompleted className="size-full" active={open} />}
          appName="Medición de lectura"
          statusText="Inicial - Completada"
        />
      </Row>
    </div>
  ),
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6">
      <span className="w-64 shrink-0 font-inter text-sm text-lightgray">{label}</span>
      {children}
    </div>
  );
}
