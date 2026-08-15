import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Estampita } from './Estampita';

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof Estampita> = {
  title: 'Componentes/Estampita',
  component: Estampita,
  args: { label: 'Agregar', icon: <PlusIcon /> },
};
export default meta;
type Story = StoryObj<typeof Estampita>;

export const Playground: Story = {};
export const Deshabilitada: Story = { args: { disabled: true } };
