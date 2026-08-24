import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

/** Page "Interactive" del componente Tooltip — correlacionada 1:1 con la sección "Interactive" de Figma. */
const meta: Meta<typeof Tooltip> = {
  title: 'Componentes/Tooltip',
  component: Tooltip,
  args: {
    message: 'Ahora puedes probar los botones para avanzar y retroceder por el texto',
    step: '1/3',
    onSecondaryAction: () => {},
    onPrimaryAction: () => {},
    onClose: () => {},
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

// `arrow` y `color` quedan como controles (radio buttons) en el panel de Storybook.
export const Interactive: Story = {};
