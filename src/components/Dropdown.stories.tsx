import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { IconHome } from './designerIcons';

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
