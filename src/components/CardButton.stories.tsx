import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CardButton } from './CardButton';
import { IconTurtle as TurtleIcon } from './designerIcons';

const meta: Meta<typeof CardButton> = { title: 'Componentes/CardButton', component: CardButton };
export default meta;
type Story = StoryObj<typeof CardButton>;

export const Playground: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <CardButton label="Muy lenta" icon={<TurtleIcon className="size-full" />} selected={selected} onClick={() => setSelected((v) => !v)} />
    );
  },
};
