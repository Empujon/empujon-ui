import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = { title: 'Componentes/Form', component: TextArea };
export default meta;
type Story = StoryObj<typeof TextArea>;

export const TextAreaStory: Story = {
  name: 'Text Area',
  render: () => {
    const [value, setValue] = useState('');
    return <TextArea label="Comentario" value={value} onChange={setValue} placeholder="Escribí acá..." />;
  },
};
