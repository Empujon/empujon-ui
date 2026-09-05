import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';
import { Card } from './Card';

const meta: Meta = { title: 'Componentes/Notifications' };
export default meta;
type Story = StoryObj;

export const Lista: Story = {
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
