import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TableFooter } from './Table';

// Mismo `title` que Table.stories.tsx: Storybook junta los archivos en la misma
// carpeta. Archivo aparte para que cada uno tenga su `component` y sus Controls.
const meta: Meta<typeof TableFooter> = { title: 'Componentes/Table', component: TableFooter };
export default meta;

export const Footer: StoryObj<typeof TableFooter> = {
  args: {
    actions: [
      { action: 'editar' },
      { action: 'mover' },
      { action: 'consentimiento' },
      { action: 'informes' },
      { action: 'eliminar' },
    ],
  },
  render: (args) => (
    <div className="w-full max-w-[1032px]">
      <TableFooter {...args} />
    </div>
  ),
};
