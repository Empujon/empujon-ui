import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmotionSelector } from './EmotionSelector';

const meta: Meta<typeof EmotionSelector> = {
  title: 'Componentes/EmotionSelector',
  component: EmotionSelector,
};
export default meta;
type Story = StoryObj<typeof EmotionSelector>;

export const Playground: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['calma']);
    return <EmotionSelector value={selected} onChange={setSelected} />;
  },
};

export const SeleccionUnica: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return <EmotionSelector multiple={false} value={selected} onChange={setSelected} />;
  },
};
