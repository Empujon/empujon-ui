import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Componentes/Breadcrumb',
  component: Breadcrumb,
  args: {
    items: [
      { label: 'Gestión', onClick: () => {} },
      { label: 'Estudiantes', onClick: () => {} },
      { label: 'Eric Bejarano' },
    ],
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Playground: Story = {};
