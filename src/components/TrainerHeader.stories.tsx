import type { Meta, StoryObj } from '@storybook/react';
import { TrainerHeader } from './TrainerHeader';
import {
  IconMiniMedicionDefault,
  IconMiniTurboDefault,
  IconMiniFotoflashDefault,
  IconMiniGranpaneoDefault,
} from './designerIcons';

const meta: Meta<typeof TrainerHeader> = {
  title: 'Componentes/Header entrenadores',
  component: TrainerHeader,
  args: {
    icon: <IconMiniTurboDefault className="size-full" />,
    title: 'Entrenador Turbolectura',
    subtitle: 'Estudiante: Eric Bejarano (2do grado)',
  },
};
export default meta;
type Story = StoryObj<typeof TrainerHeader>;

// Figma "titulos entrenadores" (node-id 3821-11683): un ícono Training Circuit
// Node Mini (status Default) por microaplicativo — cada uno con su glifo y label.
export const MedicionDeLectura: Story = {
  args: {
    icon: <IconMiniMedicionDefault className="size-full" />,
    title: 'Medición de Lectura',
  },
};

export const EntrenadorTurbolectura: Story = {};

export const EntrenadorFotoflash: Story = {
  args: {
    icon: <IconMiniFotoflashDefault className="size-full" />,
    title: 'Entrenador Fotoflash',
  },
};

export const EntrenadorGranpaneo: Story = {
  args: {
    icon: <IconMiniGranpaneoDefault className="size-full" />,
    title: 'Entrenador Granpaneo',
  },
};

export const SinSubtitulo: Story = { args: { subtitle: undefined } };
