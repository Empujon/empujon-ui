import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, type AvatarCharacter } from './Avatar';

const meta: Meta<typeof Avatar> = { title: 'Componentes/Avatar', component: Avatar };
export default meta;
type Story = StoryObj<typeof Avatar>;

const CHARACTERS: AvatarCharacter[] = ['estudiante-1', 'estudiante-2', 'estudiante-3', 'estudiante-4', 'docente'];

export const Formas: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar shape="border"><span className="text-whitesmoke font-shantell text-2xl">EB</span></Avatar>
      <Avatar shape="plain"><span className="text-whitesmoke font-shantell text-2xl">EB</span></Avatar>
      <Avatar shape="circle"><span className="text-whitesmoke font-shantell text-2xl">EB</span></Avatar>
    </div>
  ),
};

// Los 4 estudiantes + el docente, en las 3 formas (Figma › node 6914:2306).
export const Personajes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['border', 'plain', 'circle'] as const).map((shape) => (
        <div key={shape} className="flex items-center gap-4">
          <span className="w-16 shrink-0 font-inter text-xs text-white/60">{shape}</span>
          {CHARACTERS.map((c) => (
            <Avatar key={c} character={c} shape={shape} />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const ConFoto: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar shape="border" src="https://i.pravatar.cc/150?img=5" alt="Estudiante" />
      <Avatar shape="circle" src="https://i.pravatar.cc/150?img=5" alt="Estudiante" />
    </div>
  ),
};
