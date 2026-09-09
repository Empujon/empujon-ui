import type { Meta, StoryObj } from '@storybook/react';
import { TimerButton } from './TimerButton';

const meta: Meta<typeof TimerButton> = {
  title: 'Componentes/TimerButton',
  component: TimerButton,
  args: { seconds: 17 * 60 + 23, warnThreshold: 300 },
};
export default meta;
type Story = StoryObj<typeof TimerButton>;

export const Default: Story = {};

export const Urgent: Story = {
  args: { seconds: 23 },
};
