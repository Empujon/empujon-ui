import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { IconChipActividad as Spark } from './designerIcons';

// Variantes "On Light" (primary-light, secondary-light, ghost-light, ghost-shantell) están
// pensadas por Figma para vivir sobre una superficie clara — ghost-light/ghost-shantell son
// texto negro sobre fondo transparente, literalmente invisibles sobre el canvas oscuro por
// default de Storybook. En vez de depender del toggle de "backgrounds" del toolbar (que no
// aplica en un export estático de Storybook ni en la vista de Docs), cada swatch declara su
// propio fondo — así el ejemplo es correcto sin que nadie tenga que acordarse de cambiar nada.
const LIGHT_SURFACE_VARIANTS = new Set(['primary-light', 'secondary-light', 'ghost-light', 'ghost-shantell']);

const Swatch = ({ light, children }: { light: boolean; children: React.ReactNode }) => (
  <div className={`inline-flex rounded-xl p-4 ${light ? 'bg-whitesmoke' : 'bg-black'}`}>{children}</div>
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
        'ghost-light',
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

export const Playground: Story = { args: { icon: <Spark className="size-full" /> } };

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Swatch light={false}>
        <div className="flex flex-wrap gap-4">
          {(['primary-dark', 'secondary-dark', 'ghost', 'danger-fill', 'danger-outline'] as const).map((v) => (
            <Button key={v} variant={v} icon={<Spark className="size-full" />}>
              {v}
            </Button>
          ))}
        </div>
      </Swatch>
      <Swatch light={true}>
        <div className="flex flex-wrap gap-4">
          {(['primary-light', 'secondary-light', 'ghost-light', 'ghost-shantell'] as const).map((v) => (
            <Button key={v} variant={v} icon={<Spark className="size-full" />}>
              {v}
            </Button>
          ))}
        </div>
      </Swatch>
    </div>
  ),
};

export const Tamaños: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Button key={s} size={s} icon={<Spark className="size-full" />}>
          Botón {s}
        </Button>
      ))}
    </div>
  ),
};

export const Estados: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button icon={<Spark className="size-full" />}>Default</Button>
      <Button disabled icon={<Spark className="size-full" />}>Deshabilitado</Button>
      <Button loading>Cargando</Button>
      <Button icon={<Spark className="size-full" />} iconPosition="right">Ícono derecha</Button>
    </div>
  ),
};

const ALL_VARIANTS = [
  'primary-dark',
  'primary-light',
  'secondary-dark',
  'secondary-light',
  'ghost',
  'ghost-light',
  'ghost-shantell',
  'danger-fill',
  'danger-outline',
] as const;

// Todas las variantes en default y deshabilitado (hover/activo se ven interactuando).
// Fondo del swatch de cada fila = la superficie real donde Figma pensó esa variante, no el
// canvas de Storybook — así la matriz es correcta mires o no mires con el toolbar de "claro".
export const Matriz: Story = {
  render: () => (
    <div className="grid grid-cols-[170px_1fr_1fr] gap-x-6 gap-y-3 items-center">
      <span />
      <span className="text-white/60 text-xs font-inter">default</span>
      <span className="text-white/60 text-xs font-inter">deshabilitado</span>
      {ALL_VARIANTS.map((v) => {
        const light = LIGHT_SURFACE_VARIANTS.has(v);
        return (
          <React.Fragment key={v}>
            <span className="text-white/80 text-xs font-inter">{v}</span>
            <Swatch light={light}>
              <Button variant={v} icon={<Spark className="size-full" />}>Botón</Button>
            </Swatch>
            <Swatch light={light}>
              <Button variant={v} icon={<Spark className="size-full" />} disabled>Botón</Button>
            </Swatch>
          </React.Fragment>
        );
      })}
    </div>
  ),
};
