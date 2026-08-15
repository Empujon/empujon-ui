import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = { title: 'Componentes/Input', component: Input };
export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Input label="Nombre" value={value} onChange={setValue} placeholder="Escribí tu nombre" />;
  },
};

export const ConError: Story = {
  render: () => <Input label="Email" value="no-es-un-email" onChange={() => {}} error="Formato inválido" />,
};
