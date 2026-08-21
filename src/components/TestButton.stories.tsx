import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Story de prueba — usada para practicar el flujo de push directo a master.
// Se puede borrar este archivo sin afectar nada del sistema de diseño real.
const meta: Meta<typeof Button> = {
  title: 'Pruebas/TestButton',
  component: Button,
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Prueba: Story = {
  args: { children: 'Botón de prueba' },
};
