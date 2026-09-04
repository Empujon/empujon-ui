import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = { title: 'Componentes/Settings', component: Slider };
export default meta;
type Story = StoryObj<typeof Slider>;

export const SliderStory: Story = {
  name: 'Slider',
  render: () => {
    const [value, setValue] = useState(142);
    const [range, setRange] = useState<[number, number]>([5, 16]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Simple</span>
          <Slider label="Velocidad de lectura" value={value} min={0} max={500} unit="ppm" onChange={setValue} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Rango</span>
          <Slider range label="Caracteres por frase" value={range} min={3} max={20} onChange={setRange} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Deshabilitado</span>
          <Slider label="Velocidad de lectura" value={142} min={0} max={500} unit="ppm" onChange={() => {}} disabled />
        </div>
      </div>
    );
  },
};
