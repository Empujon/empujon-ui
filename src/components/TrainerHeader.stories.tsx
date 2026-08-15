import type { Meta, StoryObj } from '@storybook/react';
import { TrainerHeader } from './TrainerHeader';

const PlaceholderIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" className="size-full" aria-hidden="true">
    <circle cx="24" cy="24" r="22" fill="#F79045" />
    <path d="M16 24l6 6 12-14" stroke="#171D17" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta: Meta<typeof TrainerHeader> = {
  title: 'Componentes/TrainerHeader',
  component: TrainerHeader,
  args: {
    icon: <PlaceholderIcon />,
    title: 'Entrenador Turbolectura',
    subtitle: 'Estudiante: Eric Bejarano (2do grado)',
  },
};
export default meta;
type Story = StoryObj<typeof TrainerHeader>;

export const Playground: Story = {};

export const SinSubtitulo: Story = { args: { subtitle: undefined } };
