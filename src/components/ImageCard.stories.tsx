import type { Meta, StoryObj } from '@storybook/react';
import { ImageCard } from './ImageCard';

const meta: Meta<typeof ImageCard> = {
  title: 'Componentes/Cards',
  component: ImageCard,
  args: { label: 'Título card' },
};
export default meta;
type Story = StoryObj<typeof ImageCard>;

// Sin prop de "seleccionado": Hover/Active son interacción real, probalos
// pasando el mouse/clickeando la card. Sin `image`, muestra el placeholder
// ilustrado de Figma (glifo de "sin foto").
export const Image: Story = {
  args: { onClick: () => {} },
};
