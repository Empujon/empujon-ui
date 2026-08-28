import type { Meta, StoryObj } from '@storybook/react';
import { RoundButton } from './RoundButton';
import { IconPencil } from './designerIcons';

const meta: Meta<typeof RoundButton> = {
  title: 'Componentes/Button',
  component: RoundButton,
  args: { icon: <IconPencil className="size-full" />, label: 'Editar curso', size: 'sm' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
};
export default meta;
type Story = StoryObj<typeof RoundButton>;

// Hover es interacción real (pasá el mouse) — el círculo se expande a pill y
// muestra el label. El control "size" del panel cambia el tamaño, igual que en
// Basic button.
export const RoundButtonPage: Story = {
  name: 'Round button',
  render: (args) => <RoundButton {...args} />,
};
