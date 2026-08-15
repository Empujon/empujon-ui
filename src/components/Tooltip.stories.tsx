import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Componentes/Tooltip',
  component: Tooltip,
  args: {
    message: 'Ahora puedes probar los botones para avanzar y retroceder por el texto',
    step: '1/3',
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Right: Story = { args: { direction: 'right', onNext: () => {}, onClose: () => {} } };
export const Down: Story = { args: { direction: 'down', onNext: () => {}, onClose: () => {} } };
