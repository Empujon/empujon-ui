import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

// Fiel al Figma "SISTEMA DE DISEÑO" › sección "Tag" (component set, node
// 7671:5802). Hover/Focus/Pressed son interacción CSS real sobre los tags
// de "Acción" — jugá con el mouse y el teclado en el canvas para verlos.
//
// El nombre de la story es "tag" (minúscula) a propósito: si fuera "Tag"
// (idéntico al título), Storybook fusiona carpeta+story en una fila plana
// ("single-story hoisting" — PR oficial #13039, sin flag para desactivarlo;
// probé además ocultar una segunda story como workaround y tampoco evita el
// merge, porque Storybook decide según lo que se VE en el sidebar, no según
// el total en el índice). Con el nombre distinto, se ve con carpeta + ícono
// de flechita, igual que el resto de los componentes de la librería.
const meta: Meta<typeof Tag> = {
  title: 'Componentes/Tag',
  component: Tag,
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const TagStory: Story = {
  name: 'tag',
  render: () => (
    <div className="flex flex-col gap-4 rounded-xl bg-black p-6">
      <div className="flex flex-col gap-2">
        <span className="font-inter text-xs text-white/60">Informativo</span>
        <div className="flex flex-wrap items-center gap-3">
          <Tag variant="informative">Menor de edad</Tag>
          <Tag variant="informative" size="l">Menor de edad</Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-inter text-xs text-white/60">Acción</span>
        <div className="flex flex-wrap items-center gap-3">
          <Tag onClick={() => {}} onClose={() => {}}>Menor de edad</Tag>
          <Tag size="l" onClick={() => {}} onClose={() => {}}>Menor de edad</Tag>
        </div>
      </div>
    </div>
  ),
};
