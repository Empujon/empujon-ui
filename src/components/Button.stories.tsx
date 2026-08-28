import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { IconChipActividad as Spark } from './designerIcons';

// Variantes "On Light" (primary-light, secondary-light, ghost-light) están pensadas por
// Figma para vivir sobre una superficie clara — ghost-light es texto negro sobre fondo
// transparente, literalmente invisible sobre el canvas oscuro por default de Storybook.
// En vez de depender del toggle de "backgrounds" del toolbar (que no aplica en un export
// estático de Storybook ni en la vista de Docs), cada swatch declara su propio fondo — así
// el ejemplo es correcto sin que nadie tenga que acordarse de cambiar nada.
const LIGHT_SURFACE_VARIANTS = new Set(['primary-light', 'secondary-light', 'ghost-light']);

const Swatch = ({ light, children }: { light: boolean; children: React.ReactNode }) => (
  <div className={`inline-flex rounded-xl p-4 ${light ? 'bg-whitesmoke' : 'bg-black'}`}>{children}</div>
);

const meta: Meta<typeof Button> = {
  title: 'Componentes/Button',
  component: Button,
  args: { children: 'Botón', size: 'md' },
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
        'danger-fill',
        'danger-outline',
      ],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

// Orden y nombres 1:1 con el component set de Figma ("Style=..."): "ghost" acá es el
// "Ghost On Dark" de Figma.
const ALL_VARIANTS = [
  'primary-dark',
  'secondary-dark',
  'primary-light',
  'secondary-light',
  'ghost',
  'ghost-light',
  'danger-fill',
  'danger-outline',
] as const;

const VARIANT_LABELS: Record<(typeof ALL_VARIANTS)[number], string> = {
  'primary-dark': 'Primary On Dark',
  'secondary-dark': 'Secondary On Dark',
  'primary-light': 'Primary On Light',
  'secondary-light': 'Secondary On Light',
  ghost: 'Ghost On Dark',
  'ghost-light': 'Ghost On Light',
  'danger-fill': 'Danger Filled',
  'danger-outline': 'Danger Outline',
};

// Todas las variantes en Default y Disabled (Hover/Active se ven interactuando).
// Fondo del swatch de cada fila = la superficie real donde Figma pensó esa variante, no el
// canvas de Storybook — así la matriz es correcta mires o no mires con el toolbar de "claro".
// El control "size" del panel SÍ cambia el tamaño acá (se pasa como args.size a cada botón).
export const BasicButton: Story = {
  name: 'Basic button',
  render: (args) => (
    <div className="grid grid-cols-[170px_1fr_1fr] gap-x-6 gap-y-3 items-center">
      <span />
      <span className="text-white/60 text-xs font-inter">Default</span>
      <span className="text-white/60 text-xs font-inter">Disabled</span>
      {ALL_VARIANTS.map((v) => {
        const light = LIGHT_SURFACE_VARIANTS.has(v);
        return (
          <React.Fragment key={v}>
            <span className="text-white/80 text-xs font-inter">{VARIANT_LABELS[v]}</span>
            <Swatch light={light}>
              <Button variant={v} size={args.size} icon={<Spark className="size-full" />}>Botón</Button>
            </Swatch>
            <Swatch light={light}>
              <Button variant={v} size={args.size} icon={<Spark className="size-full" />} disabled>Botón</Button>
            </Swatch>
          </React.Fragment>
        );
      })}
    </div>
  ),
};
