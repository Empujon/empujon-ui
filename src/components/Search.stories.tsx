import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Search } from './Search';

const meta: Meta<typeof Search> = { title: 'Componentes/Search', component: Search };
export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <Search value={value} onChange={setValue} />;
  },
};

export const Deshabilitado: Story = { args: { value: '', onChange: () => {}, disabled: true } };
