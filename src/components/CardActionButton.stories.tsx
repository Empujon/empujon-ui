import type { Meta, StoryObj } from '@storybook/react';
import { CardActionButton } from './CardActionButton';

const meta: Meta<typeof CardActionButton> = {
  title: 'Componentes/CardActionButton',
  component: CardActionButton,
  args: { label: 'Ajustar cámara' },
};
export default meta;
type Story = StoryObj<typeof CardActionButton>;

export const Estados: Story = {
  render: () => (
    <div className="flex w-[664px] flex-col gap-4">
      <CardActionButton label="Ajustar cámara" />
      <CardActionButton label="Ajustar cámara" variant="outline" />
      <CardActionButton label="Cámara ajustada" complete />
    </div>
  ),
};
