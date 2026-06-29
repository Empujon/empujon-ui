import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const Spark = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden="true">
    <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" fill="currentColor" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Componentes/Button',
  component: Button,
  args: { children: 'Botón' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary-dark',
        'primary-light',
        'secondary-dark',
        'secondary-light',
        'ghost',
        'ghost-shantell',
        'danger-fill',
        'danger-outline',
      ],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = { args: { icon: <Spark /> } };

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          'primary-dark',
          'secondary-dark',
          'ghost',
          'ghost-shantell',
          'danger-fill',
          'danger-outline',
        ] as const
      ).map((v) => (
        <Button key={v} variant={v} icon={<Spark />}>
          {v}
        </Button>
      ))}
    </div>
  ),
};

export const Tamaños: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Button key={s} size={s} icon={<Spark />}>
          Botón {s}
        </Button>
      ))}
    </div>
  ),
};

export const Estados: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button icon={<Spark />}>Default</Button>
      <Button disabled icon={<Spark />}>Deshabilitado</Button>
      <Button loading>Cargando</Button>
      <Button icon={<Spark />} iconPosition="right">Ícono derecha</Button>
    </div>
  ),
};

const ALL_VARIANTS = [
  'primary-dark',
  'primary-light',
  'secondary-dark',
  'secondary-light',
  'ghost',
  'ghost-shantell',
  'danger-fill',
  'danger-outline',
] as const;

// Todas las variantes en default y deshabilitado (hover/activo se ven interactuando).
export const Matriz: Story = {
  render: () => (
    <div className="grid grid-cols-[170px_1fr_1fr] gap-x-6 gap-y-3 items-center">
      <span />
      <span className="text-white/60 text-xs font-inter">default</span>
      <span className="text-white/60 text-xs font-inter">deshabilitado</span>
      {ALL_VARIANTS.map((v) => (
        <React.Fragment key={v}>
          <span className="text-white/80 text-xs font-inter">{v}</span>
          <Button variant={v} icon={<Spark />}>Botón</Button>
          <Button variant={v} icon={<Spark />} disabled>Botón</Button>
        </React.Fragment>
      ))}
    </div>
  ),
};
