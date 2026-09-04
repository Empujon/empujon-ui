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

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch checked={false} onChange={() => {}} label="Off" />
      <Switch checked={true} onChange={() => {}} label="On" />
      <Switch checked={false} onChange={() => {}} label="Off deshabilitado" disabled />
      <Switch checked={true} onChange={() => {}} label="On deshabilitado" disabled />
    </div>
  ),
};
