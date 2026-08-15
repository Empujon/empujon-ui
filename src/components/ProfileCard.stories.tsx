import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Avatar } from './Avatar';

const meta: Meta<typeof ProfileCard> = {
  title: 'Componentes/ProfileCard',
  component: ProfileCard,
  args: {
    name: 'Eric Bejarano',
    subtitle: '2do grado',
    avatar: (
      <Avatar shape="plain">
        <span className="font-shantell text-2xl text-whitesmoke">EB</span>
      </Avatar>
    ),
  },
};
export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Playground: Story = {
  args: {
    children: <p className="font-inter text-lightgray">5/21 actividades completadas</p>,
  },
};
