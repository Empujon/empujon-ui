import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Avatar } from './Avatar';

const meta: Meta<typeof ProfileCard> = {
  title: 'Componentes/Cards',
  component: ProfileCard,
  args: {
    name: 'Santiago Saoia',
    subtitle: '4to A (Empujón school)',
    accountStatus: { label: 'Cuenta activa', statusLabel: 'Al día' },
    // El avatar de Figma para esta card no es una instancia del componente
    // Avatar (es un frame propio) — se aproxima con Avatar shape="plain" +
    // override de borde/radio, mismo criterio que la foto de Student Card.
    avatar: (
      <Avatar shape="plain" character="estudiante-2" size={104} className="rounded-[10.4px] border-2 border-magenta" />
    ),
  },
};
export default meta;
type Story = StoryObj<typeof ProfileCard>;

// No hay prop de layout: es responsive por CSS (mobile-first, cambia en el
// breakpoint `md`). Angostá el canvas del Storybook (o usá el toolbar de
// Viewport) para ver el layout de fila (mobile) pasar a columna (desktop).
// En mobile la card es `w-full` — el margen de 16px por lado lo pone la
// página (grilla de la plataforma), no la card. No agregamos padding acá:
// el preview de Storybook ya trae 16px de padding en el body por default,
// que coincide con ese margen y sirve para verlo tal cual se vería.
export const StudentProfile: Story = {
  name: 'Student profile',
  args: { onClick: () => {} },
};
