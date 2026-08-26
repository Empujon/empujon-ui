import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';
import { IconHome } from './designerIcons';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Componentes/Breadcrumb',
  component: Breadcrumb,
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// Migas simples, sin selector (Figma › variante sin dropdown).
export const Trail: Story = {
  args: {
    items: [{ label: 'Institución', onClick: () => {} }, { label: 'Curso', onClick: () => {} }, { label: 'Nombre Estudiante' }],
  },
};

// Migas con dos ítems selector (Figma › "Breadcrumb" Levels=3, institución + curso).
export const TrailWithDropdown: Story = {
  render: () => {
    const [institucionId, setInstitucionId] = useState('inst-a');
    const [cursoId, setCursoId] = useState('curso-a');
    return (
      <Breadcrumb
        items={[
          {
            label: 'Nombre Institución',
            dropdown: {
              options: [
                { id: 'inst-a', label: 'Institución A' },
                { id: 'inst-b', label: 'Institución B' },
              ],
              currentId: institucionId,
              onSelect: setInstitucionId,
            },
          },
          {
            label: 'Curso',
            dropdown: {
              options: [
                { id: 'curso-a', label: 'Curso A' },
                { id: 'curso-b', label: 'Curso B' },
                { id: 'curso-c', label: 'Curso C' },
              ],
              currentId: cursoId,
              onSelect: setCursoId,
            },
          },
          { label: 'Nombre estudiante' },
        ]}
      />
    );
  },
};

// Primer nivel (ex `BreadcrumbSelect` — selector de instituciones de la home):
// un Breadcrumb de un solo ítem, sin migas previas, que te lleva al inicio de
// la plataforma. Puede tener una sola opción (no navega a otro lado, solo
// muestra dónde estás) o varias (además funciona como selector).
const INSTITUCIONES = [
  { id: 'inst-a', label: 'Institución A' },
  { id: 'inst-b', label: 'Institución B' },
  { id: 'inst-c', label: 'Institución C' },
  { id: 'inst-d', label: 'Institución D' },
  { id: 'inst-e', label: 'Institución E' },
];

export const Home: Story = {
  render: () => (
    <Breadcrumb
      showHomeIcon={false}
      items={[
        {
          label: 'Institución única',
          icon: <IconHome className="size-6 shrink-0" />,
          // Es un link (Inter, sin subrayado salvo hover), no la página
          // "actual" — aunque sea el único ítem, lleva al inicio de la
          // plataforma. Sin dropdown (una sola opción) sigue siendo
          // cliqueable gracias a este onClick.
          current: false,
          onClick: () => {},
          dropdown: { options: [{ id: 'unica', label: 'Institución única' }], currentId: 'unica', onSelect: () => {} },
        },
      ]}
    />
  ),
};

export const HomeWithDropdown: Story = {
  render: () => {
    const [currentId, setCurrentId] = useState('inst-a');
    return (
      <Breadcrumb
        showHomeIcon={false}
        items={[
          {
            label: INSTITUCIONES.find((s) => s.id === currentId)?.label ?? '',
            icon: <IconHome className="size-6 shrink-0" />,
            current: false, // ídem: es un link al inicio, no la página actual.
            // 5 opciones superan el umbral de búsqueda automático (>3) — se
            // fuerza a `false` para esta story puntual.
            dropdown: { options: INSTITUCIONES, currentId, onSelect: setCurrentId, search: false },
          },
        ]}
      />
    );
  },
};

// Con buscador arriba del listado (automático con más de 3 opciones).
export const HomeWithSearch: Story = {
  render: () => {
    const [currentId, setCurrentId] = useState(INSTITUCIONES[0].id);
    return (
      <Breadcrumb
        showHomeIcon={false}
        items={[
          {
            label: INSTITUCIONES.find((s) => s.id === currentId)?.label ?? '',
            current: false,
            dropdown: { options: INSTITUCIONES, currentId, onSelect: setCurrentId },
          },
        ]}
      />
    );
  },
};
