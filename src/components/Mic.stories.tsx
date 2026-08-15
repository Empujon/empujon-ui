import type { Meta, StoryObj } from '@storybook/react';
import { Mic } from './Mic';

const meta: Meta<typeof Mic> = { title: 'Componentes/Mic', component: Mic };
export default meta;
type Story = StoryObj<typeof Mic>;

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Mic listening={false} />
      <Mic listening={true} />
    </div>
  ),
};
