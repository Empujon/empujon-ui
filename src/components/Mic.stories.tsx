import type { Meta, StoryObj } from '@storybook/react';
import { Mic } from './Mic';

// Sacado 1:1 de producción (fluidez_lectora, pantalla "Ajusta tu cámara y
// micrófono"): mismo color-por-nivel (blanco/verde/rojo) y mismo umbral
// "bueno para hablar" (0.15–0.8) que usa ahí el AnalyserNode real.
const meta: Meta<typeof Mic> = { title: 'Componentes/Mic', component: Mic };
export default meta;
type Story = StoryObj<typeof Mic>;

const ESTADOS = [
  { legend: 'Idle (sin permiso / sin escuchar)', listening: false },
  { legend: 'Escuchando — nivel muy bajo (rojo)', listening: true, level: 0.05 },
  { legend: 'Escuchando — nivel óptimo (verde)', listening: true, level: 0.4 },
  { legend: 'Escuchando — nivel saturado (rojo)', listening: true, level: 0.95 },
] as const;

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-4 rounded-xl bg-black p-6">
      {ESTADOS.map(({ legend, listening, level }) => (
        <div key={legend} className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">{legend}</span>
          <Mic listening={listening} level={level} />
        </div>
      ))}
    </div>
  ),
};
