import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CircuitPath, type CircuitNodeItem } from './CircuitPath';

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
    <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" fill="currentColor" />
  </svg>
);

const nodes: CircuitNodeItem[] = [
  { key: 'n1', status: 'completed' },
  { key: 'n2', status: 'completed' },
  { key: 'n3', status: 'in-progress', icon: <StarIcon /> },
  { key: 'n4', status: 'available', icon: <StarIcon /> },
  { key: 'n5', status: 'unavailable', icon: <StarIcon /> },
  { key: 'n6', status: 'locked' },
];

const meta: Meta<typeof CircuitPath> = { title: 'Componentes/CircuitPath', component: CircuitPath, args: { nodes } };
export default meta;
type Story = StoryObj<typeof CircuitPath>;

export const Playground: Story = {};
