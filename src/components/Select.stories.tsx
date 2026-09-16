import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const OPTIONS = [
  { value: 'a', label: 'Opción A' },
  { value: 'b', label: 'Opción B' },
  { value: 'c', label: 'Opción C' },
];

const meta: Meta<typeof Select> = { title: 'Componentes/Form', component: Select };
export default meta;
type Story = StoryObj<typeof Select>;

export const SelectStory: Story = {
  name: 'Select',
  render: () => {
    const [neutralValue, setNeutralValue] = useState('');
    const [legacyValue, setLegacyValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Select</span>
          <Select label="Elegí una opción" value={neutralValue} onChange={setNeutralValue} options={OPTIONS} variant="neutral" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">SelectLegacy</span>
          <Select label="Elegí una opción" value={legacyValue} onChange={setLegacyValue} options={OPTIONS} variant="default" />
        </div>
      </div>
    );
  },
};
