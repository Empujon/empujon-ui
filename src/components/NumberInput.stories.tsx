import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';

const meta: Meta<typeof NumberInput> = { title: 'Componentes/Settings', component: NumberInput };
export default meta;
type Story = StoryObj<typeof NumberInput>;

export const NumberInputStory: Story = {
  name: 'Number input',
  render: () => {
    const [value, setValue] = useState(24);
    return (
      <div className="w-[290px]">
        <NumberInput label="Tamaño de letra" value={value} min={8} max={72} unit="p" onChange={setValue} />
      </div>
    );
  },
};
