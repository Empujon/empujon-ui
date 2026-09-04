import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = { title: 'Componentes/Settings', component: Switch };
export default meta;
type Story = StoryObj<typeof Switch>;

export const SwitchStory: Story = {
  name: 'Switch',
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Switch checked={checked} onChange={setChecked} label="Repetir hasta terminar el texto" />;
  },
};
