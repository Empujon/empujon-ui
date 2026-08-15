import type { Meta, StoryObj } from '@storybook/react';
import { SquareButton } from './SquareButton';

const meta: Meta<typeof SquareButton> = {
  title: 'Componentes/SquareButton',
  component: SquareButton,
  args: { label: 'Ingreso manual', description: 'Agrega estudiantes uno por uno completando un formulario' },
};
export default meta;
type Story = StoryObj<typeof SquareButton>;

export const Playground: Story = {};
export const Seleccionado: Story = { args: { selected: true } };
export const Deshabilitado: Story = { args: { disabled: true } };
