import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Componentes/Accordion',
  component: Accordion,
  argTypes: {
    variant: { table: { disable: true } },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

// Disabled se prueba con el control (no como historia aparte): son dos variantes reales
// en Figma (Filled, Line), y disabled es un estado de cada una, no una tercera/cuarta variante.
export const Filled: Story = {
  args: {
    title: 'Parámetros para este Nivel',
    variant: 'filled',
    defaultOpen: true,
    disabled: false,
  },
  render: (args) => (
    <div className="w-full max-w-[680px]">
      <Accordion {...args}>
        <p className="font-inter">Diferenciación, cantidad de palabras similares, duración de exposición…</p>
      </Accordion>
    </div>
  ),
};

export const Line: Story = {
  args: {
    title: '¿Necesito formación previa en psicopedagogía para usar Empujón?',
    variant: 'line',
    defaultOpen: true,
    disabled: false,
  },
  render: (args) => (
    <div className="w-full max-w-[680px] bg-black">
      <Accordion {...args}>
        <p className="font-inter text-[18px] leading-[1.5]">
          No, nuestra plataforma incluye manuales paso a paso y guías de administración que te acompañan en cada
          prueba. Cualquier docente o profesional puede aplicarla de forma intuitiva desde la primera sesión.
        </p>
      </Accordion>
    </div>
  ),
};
