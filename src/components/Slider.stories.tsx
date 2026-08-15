import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = { title: 'Componentes/Slider', component: Slider };
export default meta;
type Story = StoryObj<typeof Slider>;

export const Simple: Story = {
  render: () => {
    const [value, setValue] = useState(142);
    return (
      <div className="w-[592px]">
        <Slider label="Velocidad de lectura" value={value} min={0} max={500} unit="ppm" onChange={setValue} />
      </div>
    );
  },
};

export const Rango: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([5, 16]);
    return (
      <div className="w-[592px]">
        <Slider range label="Caracteres por frase" value={value} min={3} max={20} onChange={setValue} />
      </div>
    );
  },
};

export const Deshabilitado: Story = {
  render: () => (
    <div className="w-[592px]">
      <Slider label="Velocidad de lectura" value={142} min={0} max={500} unit="ppm" onChange={() => {}} disabled />
    </div>
  ),
};
