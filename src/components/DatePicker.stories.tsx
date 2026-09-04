import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { DateRangePicker } from './DateRangePicker';
import type { DateRange } from './DatePicker';

const meta: Meta<typeof DatePicker> = { title: 'Componentes/Form', component: DatePicker };
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const DatePickerStory: Story = {
  name: 'Date picker',
  render: () => {
    const [value, setValue] = useState('');
    const [range, setRange] = useState<DateRange>({ from: null, to: null });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Date Picker</span>
          <DatePicker label="Fecha de nacimiento" value={value} onChange={setValue} variant="neutral" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Date Range Picker</span>
          <DateRangePicker value={range} onChange={setRange} />
        </div>
      </div>
    );
  },
};
