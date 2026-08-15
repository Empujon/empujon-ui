import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = { title: 'Componentes/Radio', component: Radio };
export default meta;
type Story = StoryObj<typeof Radio>;

export const Playground: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Radio checked={checked} onChange={() => setChecked(true)} name="demo" />;
  },
};
