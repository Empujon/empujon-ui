import type { Meta, StoryObj } from '@storybook/react';
import { WeeklyProgress } from './WeeklyProgress';

const meta: Meta<typeof WeeklyProgress> = {
  title: 'Componentes/WeeklyProgress',
  component: WeeklyProgress,
  args: { total: 3, completed: 2 },
  argTypes: {
    total: { control: { type: 'number', min: 1, max: 5 } },
    completed: { control: { type: 'number', min: 0, max: 5 } },
  },
};
export default meta;
type Story = StoryObj<typeof WeeklyProgress>;

// Card tal cual va en el perfil (desktop: columna de 328).
export const Default: Story = {
  render: (args) => (
    <div className="w-[328px]">
      <WeeklyProgress {...args} />
    </div>
  ),
};

// Los 4 escenarios de "Notas para desarrolladores" (Figma 1718:31099).
export const Escenarios: Story = {
  render: () => (
    <div className="flex w-[328px] flex-col gap-6">
      {[
        { label: 'Todavía no hizo ninguna actividad', total: 3, completed: 0 },
        { label: 'Completó el total de actividades', total: 3, completed: 3 },
        { label: 'Mínimo de actividades por semana (1)', total: 1, completed: 1 },
        { label: 'Máximo de actividades por semana (5)', total: 5, completed: 2 },
      ].map(({ label, total, completed }) => (
        <div key={label} className="flex flex-col gap-2">
          <span className="text-xs font-inter text-white/60">{label}</span>
          <WeeklyProgress total={total} completed={completed} />
        </div>
      ))}
    </div>
  ),
};

// Mobile: la card ocupa el ancho (408 en el frame) y la barra se queda en 290.
export const Mobile: Story = {
  render: (args) => (
    <div className="w-[408px]">
      <WeeklyProgress {...args} />
    </div>
  ),
};
