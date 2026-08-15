import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StudentCard } from './StudentCard';
import { Avatar } from './Avatar';

const placeholderAvatar = (
  <Avatar shape="plain">
    <span className="font-shantell text-2xl text-whitesmoke">EB</span>
  </Avatar>
);

const meta: Meta<typeof StudentCard> = {
  title: 'Componentes/StudentCard',
  component: StudentCard,
  args: { name: 'Eric Bejarano', avatar: placeholderAvatar },
};
export default meta;
type Story = StoryObj<typeof StudentCard>;

export const Estados: Story = {
  render: () => (
    <div className="flex gap-4">
      <StudentCard name="Eric Bejarano" avatar={placeholderAvatar} progress={{ current: 5, total: 21 }} status="on-time" />
      <StudentCard name="Juan Manuel" avatar={placeholderAvatar} progress={{ current: 3, total: 21 }} status="delayed" />
      <StudentCard name="Estela Robles" avatar={placeholderAvatar} progress={{ current: 0, total: 21 }} status="delayed" />
      <StudentCard name="Santiago" avatar={placeholderAvatar} progress={{ current: 5, total: 21 }} status="on-time" selected />
    </div>
  ),
};
