import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Componentes/Pagination',
  component: Pagination,
  args: { onFirst: () => {}, onPrevious: () => {}, onNext: () => {}, onLast: () => {} },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {};
