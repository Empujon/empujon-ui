import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = { title: 'Componentes/Settings', component: SegmentedControl };
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const ToggleStory: Story = {
  name: 'Toggle',
  render: () => {
    const [value, setValue] = useState('mayuscula');
    const [value3, setValue3] = useState('b');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Dos opciones</span>
          <SegmentedControl
            label="Tipo de letra"
            options={[
              { value: 'mayuscula', label: 'MAYÚSCULA' },
              { value: 'minuscula', label: 'Minúscula' },
            ]}
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Tres opciones</span>
          <SegmentedControl
            options={[
              { value: 'a', label: 'Opción A' },
              { value: 'b', label: 'Opción B' },
              { value: 'c', label: 'Opción C' },
            ]}
            value={value3}
            onChange={setValue3}
          />
        </div>
      </div>
    );
  },
};
