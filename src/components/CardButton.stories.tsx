import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CardButton } from './CardButton';
import { IconTurtle as TurtleIcon } from './designerIcons';

const meta: Meta<typeof CardButton> = {
  title: 'Componentes/Button',
  component: CardButton,
  args: { label: 'Muy lenta', icon: <TurtleIcon className="size-full" /> },
  // Hover/Active son interacción real (pasá el mouse o mantené presionado) —
  // el component set de Figma no tiene un estado "seleccionado" persistente.
};
export default meta;
type Story = StoryObj<typeof CardButton>;

export const IllustrationButton: Story = {
  name: 'Illustration button',
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <CardButton {...args} />
      <CardButton {...args} disabled />
    </div>
  ),
};
