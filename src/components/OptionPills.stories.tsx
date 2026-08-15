import type { Meta, StoryObj } from '@storybook/react';
import { OptionPills } from './OptionPills';

const OPTIONS = [
  { value: 'a', label: 'Opción A' },
  { value: 'b', label: 'Opción B' },
  { value: 'c', label: 'Opción C' },
];

const meta: Meta<typeof OptionPills> = {
  title: 'Componentes/OptionPills',
  component: OptionPills,
  args: { options: OPTIONS, onSubmit: () => {} },
};
export default meta;
type Story = StoryObj<typeof OptionPills>;

export const Checkbox: Story = { args: { selectionType: 'checkbox' } };
export const Radio: Story = { args: { selectionType: 'radio' } };
