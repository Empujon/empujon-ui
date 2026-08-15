import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = { title: 'Componentes/Accordion', component: Accordion };
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Filled: Story = {
  render: () => (
    <div className="w-[680px]">
      <Accordion title="Parámetros para este Nivel" defaultOpen variant="filled">
        <p className="font-inter">Diferenciación, cantidad de palabras similares, duración de exposición…</p>
      </Accordion>
    </div>
  ),
};

export const Line: Story = {
  render: () => (
    <div className="w-[680px] bg-black p-4">
      <Accordion title="Parámetros para este Nivel" variant="line">
        <p className="font-inter">Contenido del panel.</p>
      </Accordion>
    </div>
  ),
};
