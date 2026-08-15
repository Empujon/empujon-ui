import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Choice } from './Choice';

const meta: Meta<typeof Choice> = { title: 'Componentes/Choice', component: Choice };
export default meta;
type Story = StoryObj<typeof Choice>;

export const Playground: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Choice type="checkbox" label="Acepto los términos" checked={checked} onChange={() => setChecked((v) => !v)} />;
  },
};
