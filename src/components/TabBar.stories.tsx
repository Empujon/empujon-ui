import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TabBar } from './TabBar';

const TABS = Array.from({ length: 5 }, (_, i) => ({ value: `t${i + 1}`, label: `Pestaña ${i + 1}` }));

const meta: Meta<typeof TabBar> = { title: 'Componentes/TabBar', component: TabBar };
export default meta;
type Story = StoryObj<typeof TabBar>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('t1');
    return <TabBar tabs={TABS} value={value} onChange={setValue} />;
  },
};
