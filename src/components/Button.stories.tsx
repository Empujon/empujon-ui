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
export const BasicButton: Story = {
  name: 'Basic button',
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
