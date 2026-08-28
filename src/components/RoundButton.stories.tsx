import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RoundButton } from './RoundButton';

const PencilIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden="true">
    <path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const meta: Meta<typeof RoundButton> = {
  title: 'Componentes/Button',
  component: RoundButton,
  args: { icon: <PencilIcon />, label: 'Editar curso' },
};
export default meta;
type Story = StoryObj<typeof RoundButton>;

// Hover es interacción real (pasá el mouse) — el círculo se expande a pill y
// muestra el label.
export const RoundButtonPage: Story = {
  name: 'Round button',
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <RoundButton {...args} size="sm" />
      <RoundButton {...args} size="md" />
    </div>
  ),
};
