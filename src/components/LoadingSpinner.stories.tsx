import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from './LoadingSpinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Componentes/LoadingSpinner',
  component: LoadingSpinner,
};
export default meta;
type Story = StoryObj<typeof LoadingSpinner>;

export const Cargando: Story = { args: { ready: false } };
export const Listo: Story = { args: { ready: true } };
