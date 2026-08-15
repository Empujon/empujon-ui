import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden="true">
    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'Componentes/IconButton',
  component: IconButton,
  args: { icon: <BackIcon />, 'aria-label': 'Volver' },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {};
