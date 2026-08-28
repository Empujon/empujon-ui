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
    <div className="flex w-full flex-col gap-8">
      <div className="grid w-full grid-cols-1 gap-8">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-inter text-white/60">Filled</span>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-inter text-white/40">Enabled</span>
            <CardActionButton label="Ajustar cámara" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-inter text-white/40">Complete</span>
            <CardActionButton label="Cámara ajustada" complete />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-xs font-inter text-white/60">Outline</span>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-inter text-white/40">Enabled</span>
            <CardActionButton label="Ajustar cámara" variant="outline" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-inter text-white/40">Complete</span>
            <CardActionButton label="Cámara ajustada" variant="outline" complete />
          </div>
        </div>
      </div>
    </div>
  ),
};
