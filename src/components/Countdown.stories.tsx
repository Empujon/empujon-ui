import type { Meta, StoryObj } from '@storybook/react';
import { Countdown } from './Countdown';

const meta: Meta<typeof Countdown> = {
  title: 'Componentes/Countdown',
  component: Countdown,
  args: { from: 3, onComplete: () => alert('¡Arrancó!') },
};
export default meta;
type Story = StoryObj<typeof Countdown>;

export const Yellow: Story = {
  args: { color: 'yellow' },
};

export const Orange: Story = {
  args: { color: 'orange' },
};
