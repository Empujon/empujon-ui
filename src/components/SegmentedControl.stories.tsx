import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = { title: 'Componentes/SegmentedControl', component: SegmentedControl };
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('mayuscula');
    return (
      <SegmentedControl
        label="Tipo de letra"
        options={[
          { value: 'mayuscula', label: 'MAYÚSCULA' },
          { value: 'minuscula', label: 'Minúscula' },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const TresOpciones: Story = {
  render: () => {
    const [value, setValue] = useState('b');
    return (
      <SegmentedControl
        options={[
          { value: 'a', label: 'Opción A' },
          { value: 'b', label: 'Opción B' },
          { value: 'c', label: 'Opción C' },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};
