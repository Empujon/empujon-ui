import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { TextInputEditable } from './TextInputEditable';

const meta: Meta<typeof Input> = { title: 'Componentes/Form', component: Input };
export default meta;
type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  name: 'Text input',
  render: () => {
    const [value, setValue] = useState('');
    const [editableValue, setEditableValue] = useState('luna');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Default</span>
          <Input label="Nombre" value={value} onChange={setValue} placeholder="Escribe tu nombre" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Error</span>
          <Input label="Email" value="no-es-un-email" onChange={() => {}} error="Formato inválido" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Disabled</span>
          <Input label="Nombre" value="Rocío" onChange={() => {}} disabled />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Read only</span>
          <Input label="Nombre" value="Rocío" onChange={() => {}} readOnly />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Text Input (Editable)</span>
          <TextInputEditable label="Martin Perez" value={editableValue} onSave={setEditableValue} />
        </div>
      </div>
    );
  },
};
