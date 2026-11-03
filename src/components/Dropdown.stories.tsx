import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { IconHome, IconMic } from './designerIcons';

const ITEMS = [
  { value: 'empujon-school', label: 'Empujón School' },
  { value: 'colegio-2', label: 'Colegio San Martín' },
];

const meta: Meta<typeof Dropdown> = { title: 'Componentes/Dropdown', component: Dropdown };
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['empujon-school']);
    return (
      <Dropdown
        label="Empujón School"
        icon={<IconHome />}
        items={ITEMS}
        value={value}
        onChange={setValue}
        actionItem={{ label: 'Agregar institución', onClick: () => {} }}
      />
    );
  },
};

export const Multiselect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return <Dropdown label="Filtrar por institución" items={ITEMS} multiselect value={value} onChange={setValue} />;
  },
};

// Selector de micrófono de fluidez: sólo ícono, menú hacia la izquierda, y los
// estados deshabilitado / error del hand-off "Ajusta tu cámara y micrófono".
const MICS = [
  { value: 'default', label: 'Micrófono de Macbook Air' },
  { value: 'sony', label: 'Auriculares SONY' },
];

export const SoloIcono: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['default']);
    return (
      <div className="flex min-h-[200px] gap-6 bg-black p-6">
        <Dropdown label="Elegir micrófono" hideLabel icon={<IconMic className="size-full" />} items={MICS} value={value} onChange={setValue} menuAlign="left" disabled />
        <Dropdown label="Elegir micrófono" hideLabel icon={<IconMic className="size-full" />} items={MICS} value={value} onChange={setValue} menuAlign="left" />
        <Dropdown label="Elegir micrófono" hideLabel icon={<IconMic className="size-full" />} items={MICS} value={value} onChange={setValue} menuAlign="left" error />
      </div>
    );
  },
};
