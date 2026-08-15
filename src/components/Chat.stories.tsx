import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble, ChatInputBar } from './Chat';

const meta: Meta<typeof ChatBubble> = { title: 'Componentes/Chat', component: ChatBubble };
export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="flex w-[400px] flex-col gap-3">
        <ChatBubble from="bot">¡Hola! ¿En qué te puedo ayudar hoy?</ChatBubble>
        <ChatBubble from="user">Quiero ver el progreso de mis estudiantes.</ChatBubble>
        <ChatInputBar value={value} onChange={setValue} onSend={() => setValue('')} />
      </div>
    );
  },
};
