import type { Meta, StoryObj } from '@storybook/react';
import { CardActionButton } from './CardActionButton';

const meta: Meta<typeof CardActionButton> = {
  title: 'Componentes/Button',
  component: CardActionButton,
  args: { label: 'Ajustar cámara' },
};
export default meta;
type Story = StoryObj<typeof CardActionButton>;

// Hover es interacción real (pasá el mouse) — Complete no tiene hover propio en
// Figma (estado terminal), por eso no hace falta pasar el mouse para verlo.
export const CardActionButtonPage: Story = {
  name: 'Card action button',
  render: () => (
    <div className="grid w-[664px] grid-cols-1 gap-8">
      <div className="flex flex-col gap-4">
        <span className="text-xs font-inter text-white/60">Filled</span>
        <CardActionButton label="Ajustar cámara" />
        <CardActionButton label="Cámara ajustada" complete />
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs font-inter text-white/60">Outline</span>
        <CardActionButton label="Ajustar cámara" variant="outline" />
        <CardActionButton label="Cámara ajustada" variant="outline" complete />
      </div>
    </div>
  ),
};
