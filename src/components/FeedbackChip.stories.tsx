import type { Meta, StoryObj } from '@storybook/react';
import { FeedbackChip } from './FeedbackChip';

const meta: Meta<typeof FeedbackChip> = { title: 'Componentes/FeedbackChip', component: FeedbackChip };
export default meta;
type Story = StoryObj<typeof FeedbackChip>;

export const Variantes: Story = {
  render: () => (
    <div className="flex gap-4">
      <FeedbackChip variant="correct" message="¡Correcto!" />
      <FeedbackChip variant="incorrect" message='Era "gato"' />
    </div>
  ),
};
