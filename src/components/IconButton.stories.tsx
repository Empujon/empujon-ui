import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { IconChevronForward } from './designerIcons';

// "chevron atras" (Figma node 6347:5944, ícono default del component set) es el
// mismo glifo que IconChevronForward espejado — mismo path, sin un asset aparte
// (igual criterio que IconCaretDown: un solo dibujo, la dirección la da el CSS).
//
// El SVG de designerIcons.tsx viene recortado justo al borde del trazo (sin el
// padding que el ícono tiene dentro de su propio frame de 44×44 en Figma). Medido
// en Figma (absoluteRenderBounds del vector vs. el instance box que lo contiene):
// el trazo real ocupa ~49% del ancho y ~55% del alto de su casillero — por eso acá
// se dibuja al 49%/55% en vez de al 100%, para igualar el tamaño óptico real.
const BackIcon = () => (
  <span className="flex size-full items-center justify-center">
    <IconChevronForward className="h-[55%] w-[49%] -scale-x-100" />
  </span>
);

const SIZES = ['xs', 's', 'm', 'l'] as const;
const BACKGROUNDS = [
  { value: 'with', label: 'With background' },
  { value: 'without', label: 'Without background' },
] as const;

// Mismo título que Button.stories.tsx: Storybook fusiona los stories de ambos
// archivos en una sola carpeta "Button" en el sidebar — Icon Button queda como
// una page más ahí adentro (Playground, Variantes, ..., Icon Button), no como
// un sub-componente con su propia page anidada.
const meta: Meta<typeof IconButton> = {
  title: 'Componentes/Button',
  component: IconButton,
  args: { icon: <BackIcon />, 'aria-label': 'Volver' },
  decorators: [(Story) => <div className="inline-flex rounded-xl bg-black p-6"><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof IconButton>;

// El ícono default vive en gris claro (lgray) — pensado por Figma para el canvas
// oscuro del sistema, no para un fondo claro. La story declara su propio fondo
// oscuro (igual criterio que el resto de este archivo) en vez de depender del
// toggle de "backgrounds" del toolbar.
//
// Grilla Size × Background completa (fiel al component set de Figma, node
// 7582:3371). Hover/Activo son interacción real — pasá el mouse o mantené
// presionado cualquier botón para verlos.
export const IconButtonPage: Story = {
  name: 'Icon Button',
  render: (args) => (
    <div className="grid grid-cols-[40px_1fr_1fr] items-center gap-x-8 gap-y-5">
      <span />
      {BACKGROUNDS.map(({ value, label }) => (
        <span key={value} className="text-xs font-inter text-white/60">
          {label}
        </span>
      ))}
      {SIZES.map((s) => (
        <React.Fragment key={s}>
          <span className="text-xs font-inter text-white/80">{s}</span>
          {BACKGROUNDS.map(({ value }) => (
            <IconButton key={value} {...args} size={s} background={value} />
          ))}
        </React.Fragment>
      ))}
    </div>
  ),
};
