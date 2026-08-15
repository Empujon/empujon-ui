import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const OPTIONS = [
  { value: 'a', label: 'Opción A' },
  { value: 'b', label: 'Opción B' },
  { value: 'c', label: 'Opción C' },
];

const meta: Meta<typeof Select> = { title: 'Componentes/Select', component: Select };
export default meta;
type Story = StoryObj<typeof Select>;

export const Neutral: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Select label="Elegí una opción" value={value} onChange={setValue} options={OPTIONS} variant="neutral" />;
  },
};

export const Legacy: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Select label="Elegí una opción" value={value} onChange={setValue} options={OPTIONS} variant="default" />;
  },
};
