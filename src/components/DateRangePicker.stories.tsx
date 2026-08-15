import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker } from './DateRangePicker';
import type { DateRange } from './DatePicker';

const meta: Meta<typeof DateRangePicker> = { title: 'Componentes/DateRangePicker', component: DateRangePicker };
export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange>({ from: null, to: null });
    return <DateRangePicker value={value} onChange={setValue} />;
  },
};
