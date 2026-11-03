import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Mic } from './Mic';

// Hand-off fluidez "Ajusta tu cámara y micrófono" (node 1849:3222): los estados
// del bloque "mic" en cada frame de la propuesta.
const meta: Meta<typeof Mic> = { title: 'Componentes/Mic', component: Mic };
export default meta;
type Story = StoryObj<typeof Mic>;

const DEVICES = [
  { value: 'default', label: 'Micrófono de Macbook Air' },
  { value: 'sony', label: 'Auriculares SONY' },
];

const ESTADOS = [
  { legend: 'Esperando permiso / permiso denegado (deshabilitado)', disabled: true, error: false, level: 0 },
  { legend: 'Con permiso, sin señal todavía', disabled: false, error: false, level: 0 },
  { legend: 'Con permiso, escuchando', disabled: false, error: false, level: 0.22 },
  { legend: 'No te escuchamos (10 s sin señal)', disabled: false, error: true, level: 0 },
] as const;

export const Estados: Story = {
  render: () => {
    const [deviceId, setDeviceId] = useState('default');
    return (
      <div className="flex min-h-[420px] flex-col gap-6 rounded-xl bg-black p-6">
        {ESTADOS.map(({ legend, disabled, error, level }) => (
          <div key={legend} className="flex flex-col gap-2">
            <span className="font-inter text-xs text-white/60">{legend}</span>
            <Mic
              devices={DEVICES}
              deviceId={deviceId}
              onDeviceChange={setDeviceId}
              disabled={disabled}
              error={error}
              level={level}
            />
          </div>
        ))}
      </div>
    );
  },
};
