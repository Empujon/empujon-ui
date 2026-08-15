import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbSelect } from './BreadcrumbSelect';
import { IconHome } from './designerIcons';

const meta: Meta<typeof BreadcrumbSelect> = {
  title: 'Componentes/BreadcrumbSelect',
  component: BreadcrumbSelect,
};
export default meta;
type Story = StoryObj<typeof BreadcrumbSelect>;

const SCHOOLS = [
  { id: 'phoenix-a', label: 'Phoenix A' },
  { id: 'phoenix-b', label: 'Phoenix B' },
  { id: '5to-a', label: '5to A' },
  { id: 'escakas-b', label: 'Escakas B' },
  { id: '6to-a', label: '6to A' },
  { id: '6to-b', label: '6to B' },
];

export const SelectorDeColegio: Story = {
  render: () => {
    const [currentId, setCurrentId] = useState('escakas-b');
    return (
      <BreadcrumbSelect
        currentId={currentId}
        options={SCHOOLS}
        onSelect={setCurrentId}
        icon={<IconHome className="size-6 shrink-0" />}
      />
    );
  },
};

export const UnaSolaOpcion: Story = {
  render: () => (
    <BreadcrumbSelect
      currentId="unica"
      options={[{ id: 'unica', label: 'Colegio único' }]}
      onSelect={() => {}}
      icon={<IconHome className="size-6 shrink-0" />}
    />
  ),
};

// Más de 3 opciones: crece un input de búsqueda arriba del listado.
export const ConBusqueda: Story = {
  render: () => {
    const [currentId, setCurrentId] = useState(SCHOOLS[0].id);
    return <BreadcrumbSelect currentId={currentId} options={SCHOOLS} onSelect={setCurrentId} />;
  },
};
