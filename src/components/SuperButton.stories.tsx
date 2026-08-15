import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SuperButton } from './SuperButton';

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden="true">
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor" />
  </svg>
);

const meta: Meta<typeof SuperButton> = {
  title: 'Componentes/SuperButton',
  component: SuperButton,
  args: { label: 'Nueva actividad', icon: <BoltIcon /> },
};
export default meta;
type Story = StoryObj<typeof SuperButton>;

export const Gradient: Story = { args: { variant: 'gradient' } };
export const Flat: Story = { args: { variant: 'flat' } };
