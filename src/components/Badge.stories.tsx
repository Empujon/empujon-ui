import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Componentes/Badge',
  component: Badge,
  args: { children: 'Etiqueta' },
  argTypes: {
    variant: { control: 'select', options: ['neutral', 'orange', 'yellow', 'green', 'blue', 'danger', 'outline'] },
    status: { control: 'select', options: [undefined, 'green', 'orange', 'yellow', 'red', 'blue', 'divider'] },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = { args: { status: 'green' } };

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['neutral', 'orange', 'yellow', 'green', 'blue', 'danger', 'outline'] as const).map((v) => (
        <Badge key={v} variant={v}>
          {v}
        </Badge>
      ))}
    </div>
  ),
};
