import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = { title: 'Componentes/DatePicker', component: DatePicker };
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <DatePicker label="Fecha de nacimiento" value={value} onChange={setValue} />;
  },
};
