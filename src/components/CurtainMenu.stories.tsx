import type { Meta, StoryObj } from '@storybook/react';
import { CurtainMenu } from './CurtainMenu';

const meta: Meta<typeof CurtainMenu> = {
  title: 'Componentes/CurtainMenu',
  component: CurtainMenu,
  args: {
    open: true,
    items: [
      { label: 'Inicio', letter: 'I' },
      { label: 'Gestión', letter: 'G' },
    ],
    adminItems: [{ label: 'Configuración', letter: 'C' }],
  },
};
export default meta;
type Story = StoryObj<typeof CurtainMenu>;

export const Playground: Story = {};
