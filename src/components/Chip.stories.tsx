import type { Meta, StoryObj } from '@storybook/react';

// Chip interactivo (ex "Tag") — todavía sin componente: pendiente del diseño
// en Figma. StatusLabel (ex "Informative Chip") ya se separó a su propio
// componente/página — ver StatusLabel.stories.tsx.
const meta: Meta = { title: 'Componentes/Chip' };
export default meta;
type Story = StoryObj;

export const InteractiveChip: Story = {
  name: 'Interactive Chip',
  render: () => (
    <div className="rounded-xl border border-dashed border-divider px-6 py-8 text-center font-inter text-sm text-white/50">
      Pendiente — se arma cuando el diseño de Tag (interactivo, cerrable) esté listo en Figma.
    </div>
  ),
};
