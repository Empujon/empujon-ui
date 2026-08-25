import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = { title: 'Componentes/Avatar', component: Avatar };
export default meta;
type Story = StoryObj<typeof Avatar>;

const FOTO_URL = 'https://i.pravatar.cc/150?img=5';

// Las 7 opciones del catálogo (Figma › node 6914:2306), en el orden del frame.
function renderCatalogo(shape: 'border' | 'plain' | 'circle') {
  return (
    <div className="flex gap-4">
      <Avatar shape={shape} character="estudiante-1" />
      <Avatar shape={shape} character="estudiante-2" />
      <Avatar shape={shape} character="estudiante-3" />
      <Avatar shape={shape} character="estudiante-4" />
      <Avatar shape={shape} src={FOTO_URL} alt="Estudiante" />
      <Avatar shape={shape} character="docente" />
      <Avatar shape={shape} character="iniciales">EB</Avatar>
    </div>
  );
}

export const BorderStory: Story = {
  name: 'Border',
  render: () => renderCatalogo('border'),
};

export const PlainStory: Story = {
  name: 'Plain',
  render: () => renderCatalogo('plain'),
};

export const CircleStory: Story = {
  name: 'Circle',
  render: () => renderCatalogo('circle'),
};
