import type { Meta, StoryObj } from '@storybook/react';
import { Countdown } from './Countdown';

const meta: Meta<typeof Countdown> = {
  title: 'Componentes/Countdown',
  component: Countdown,
  args: { from: 3, color: 'yellow', onComplete: () => alert('¡Arrancó!') },
  argTypes: { color: { control: 'inline-radio', options: ['yellow', 'orange'] } },
};
export default meta;
type Story = StoryObj<typeof Countdown>;

export const Playground: Story = {};

export const Colores: Story = {
  render: () => (
    <div className="flex gap-8">
      <Countdown key="y" from={3} color="yellow" onComplete={() => {}} />
      <Countdown key="o" from={3} color="orange" onComplete={() => {}} />
    </div>
  ),
};
