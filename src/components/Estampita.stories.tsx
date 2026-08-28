import type { Meta, StoryObj } from '@storybook/react';
import { Estampita } from './Estampita';

const meta: Meta<typeof Estampita> = {
  title: 'Componentes/Button',
  component: Estampita,
  argTypes: {
    style: { control: 'inline-radio', options: ['curso', 'agregar', 'profesores'] },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Estampita>;

// Hover es interacción real (pasá el mouse). Las 3 variantes de contenido de
// Figma — curso (abreviatura), agregar (+) y profesores (ícono) — una fila para
// Enabled y otra para Disabled.
export const EstampitaPage: Story = {
  name: 'Estampita',
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <span className="text-xs font-inter text-white/60">Enabled</span>
        <div className="flex flex-wrap gap-8">
          <Estampita style="curso" nombreAbreviado="6A" label="6to A" />
          <Estampita style="agregar" />
          <Estampita style="profesores" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs font-inter text-white/60">Disabled</span>
        <div className="flex flex-wrap gap-8">
          <Estampita style="curso" nombreAbreviado="6A" label="6to A" disabled />
          <Estampita style="agregar" disabled />
          <Estampita style="profesores" disabled />
        </div>
      </div>
    </div>
  ),
};
