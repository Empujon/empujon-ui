import type { Meta, StoryObj } from '@storybook/react';
import { ImageCard } from './ImageCard';

const meta: Meta<typeof ImageCard> = {
  title: 'Componentes/ImageCard',
  component: ImageCard,
  args: { label: 'Educación inclusiva' },
};
export default meta;
type Story = StoryObj<typeof ImageCard>;

export const Playground: Story = {};
export const Seleccionada: Story = { args: { selected: true } };
