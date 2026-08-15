import type { Meta, StoryObj } from '@storybook/react';
import { DotsLoader, ProgressDots } from './Loading';

const meta: Meta<typeof ProgressDots> = { title: 'Componentes/Loading', component: ProgressDots };
export default meta;
type Story = StoryObj<typeof ProgressDots>;

export const Dots: Story = {
  render: () => (
    <div className="flex gap-8">
      <DotsLoader color="green" />
      <DotsLoader color="orange" size="lg" count={4} />
    </div>
  ),
};

export const Progreso: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ProgressDots value={0} />
      <ProgressDots value={40} />
      <ProgressDots value={80} />
      <ProgressDots value={100} />
      <ProgressDots value={60} showLabel />
      <ProgressDots value={30} color="orange" showLabel />
    </div>
  ),
};

export const Playground: Story = { args: { value: 60, total: 10, color: 'green', showLabel: true } };
