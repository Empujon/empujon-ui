import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { HamburgerMenu } from './HamburgerMenu';
import { CurtainMenu } from './CurtainMenu';

const meta: Meta<typeof Navbar> = {
  title: 'Componentes/Navbar',
  component: Navbar,
  args: {
    logo: <span className="font-shantell text-2xl text-white">Empujón</span>,
    actions: <HamburgerMenu />,
  },
};
export default meta;
type Story = StoryObj<typeof Navbar>;

export const Playground: Story = {};

// El Navbar es una cáscara con un slot `menu` + prop `menuOpen`: el CurtainMenu (u otro
// contenido) se pasa ahí, empujón controla el estado de apertura desde afuera (típicamente
// ligado al mismo botón que dispara el HamburgerMenu). Nunca se veían compuestos en Storybook
// — por eso el CurtainMenu solo mostraba una grilla de iconos suelta, sin leerse como "menú".
export const ConMenuIntegrado: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-[600px]">
        <Navbar
          logo={<span className="font-shantell text-2xl text-white">Empujón</span>}
          actions={
            <button onClick={() => setOpen((v) => !v)}>
              <HamburgerMenu />
            </button>
          }
          menuOpen={open}
          onOverlayClick={() => setOpen(false)}
          menu={
            <CurtainMenu
              open={open}
              items={[
                { label: 'Inicio', letter: 'I' },
                { label: 'Gestión', letter: 'G' },
              ]}
              adminItems={[{ label: 'Configuración', letter: 'C' }]}
            />
          }
        />
      </div>
    );
  },
};
