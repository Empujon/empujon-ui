import type { Meta, StoryObj } from '@storybook/react';
import { CardButton } from './CardButton';

const meta: Meta<typeof CardButton> = {
  title: 'Componentes/Button',
  component: CardButton,
  // Hover/Active son interacción real (pasá el mouse o mantené presionado) —
  // el component set de Figma no tiene un estado "seleccionado" persistente.
};
export default meta;
type Story = StoryObj<typeof CardButton>;

export const IllustrationButton: Story = {
  name: 'Illustration button',
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-inter text-white/40">Enabled</span>
        <CardButton {...args} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-inter text-white/40">Disabled</span>
        <CardButton {...args} disabled />
      </div>
    </div>
  ),
};
