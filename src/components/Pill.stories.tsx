import type { Meta, StoryObj } from '@storybook/react';
import { Pill } from './Pill';

const meta: Meta<typeof Pill> = { title: 'Componentes/Pill', component: Pill };
export default meta;
type Story = StoryObj<typeof Pill>;

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Pill>Neutro</Pill>
      <Pill status="success">Al día</Pill>
      <Pill status="error">Con retraso</Pill>
      <Pill background="dark-grey" size="lg" status="success" onClose={() => {}}>
        Cerrable
      </Pill>
    </div>
  ),
};
