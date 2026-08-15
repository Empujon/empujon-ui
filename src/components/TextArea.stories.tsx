import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = { title: 'Componentes/TextArea', component: TextArea };
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return <TextArea label="Comentario" value={value} onChange={setValue} placeholder="Escribí acá..." />;
  },
};
