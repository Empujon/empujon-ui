import type { Meta, StoryObj } from '@storybook/react';
import { AccessCard } from './AccessCard';

const meta: Meta<typeof AccessCard> = {
  title: 'Componentes/Cards',
  component: AccessCard,
};
export default meta;
type Story = StoryObj<typeof AccessCard>;

// Los 2 ejes de Figma en un solo grid: `background` (empty/filled) como
// columnas, con su label — Hover es interacción real, pasá el mouse sobre
// cada una.
export const Access: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 bg-black p-4">
      <div className="flex flex-col gap-3">
        <span className="font-inter text-sm text-lightgray">Empty Background</span>
        <AccessCard background="empty" onClick={() => {}} />
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-inter text-sm text-lightgray">Filled Background</span>
        <AccessCard background="filled" onClick={() => {}} />
      </div>
    </div>
  ),
};
