import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { DotsLoader, ProgressDots } from './Loading';
import { Badge } from './Badge';
import { Notification } from './Notification';
import { Card } from './Card';

const meta: Meta = { title: 'Componentes/Feedback' };
export default meta;
type Story = StoryObj;

export const Spinners: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Spinner key={s} size={s} />
      ))}
      <Spinner color="green" />
    </div>
  ),
};

export const Dots: Story = {
  render: () => (
    <div className="flex items-center gap-10">
      <DotsLoader />
      <DotsLoader color="orange" size="lg" count={4} />
    </div>
  ),
};

export const Progreso: Story = {
  render: () => (
    <div className="space-y-3">
      {[0, 20, 40, 60, 80, 100].map((v) => (
        <ProgressDots key={v} value={v} />
      ))}
    </div>
  ),
};

export const Badges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge>Menor de edad</Badge>
      <Badge status="green">Consentimiento aprobado</Badge>
      <Badge status="red" variant="outline">Faltan datos</Badge>
      <Badge variant="orange">Nivel 1</Badge>
      <Badge variant="yellow">Pendiente</Badge>
      <Badge variant="blue">Activo</Badge>
      <Badge variant="green">Completado</Badge>
      <Badge variant="danger">Error</Badge>
    </div>
  ),
};

export const Notificaciones: Story = {
  render: () => (
    <Card padding="sm" className="max-w-2xl gap-0">
      <Notification
        type="success"
        title="María López completó el test de lectura."
        meta="Hace 5 min"
        actionLabel="Ver resultados"
      />
      <Notification
        type="warning"
        title="No se pudo procesar el audio."
        meta="Hace 5 min"
        actionLabel="Reintentar"
        hideDivider
      />
    </Card>
  ),
};
