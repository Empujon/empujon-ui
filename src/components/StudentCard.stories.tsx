import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StudentCard } from './StudentCard';
import { Avatar } from './Avatar';

// Foto real para el theme "Photo" (Figma: Avatar shape=border, borde magenta
// en vez del whitesmoke default — node 6916:2403).
const FOTO_URL = 'https://i.pravatar.cc/150?img=47';

const meta: Meta<typeof StudentCard> = {
  title: 'Componentes/Cards',
  component: StudentCard,
};
export default meta;
type Story = StoryObj<typeof StudentCard>;

// Los 5 themes de Figma (Verde/Rosa/Amarillo/Azul/Foto) son solo la
// ilustración del avatar — el estado real (barra + StatusLabel) sale de
// `progress`/`status`, no del theme. Hover y Active se prueban pasando el
// mouse/clickeando cada card: son interacción real, no variantes aparte.
//
// Dos filas, un "modo" cada una (Figma agregó `Modo=Actividad grupal` junto
// al `Modo=Monitoreo` original, mismos 5 themes × 3 estados): la fila de
// arriba es el uso de siempre (progreso + status); la de abajo es la card
// durante una actividad grupal en vivo (pill de actividad + código de sala).
export const Student: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Row label="Monitoreo">
        <StudentCard
          name="Eric Bejarano"
          avatar={<Avatar shape="plain" character="estudiante-1" className="bg-transparent" />}
          progress={{ current: 5, total: 21 }}
          status="on-time"
        />
        <StudentCard
          name="Juan Manuel de Rosas"
          avatar={<Avatar shape="plain" character="estudiante-2" className="bg-transparent" />}
          progress={{ current: 3, total: 21 }}
          status="delayed"
        />
        <StudentCard
          name="Estela Robles"
          avatar={<Avatar shape="plain" character="estudiante-3" className="bg-transparent" />}
          progress={{ current: 0, total: 21 }}
          status="on-time"
        />
        <StudentCard
          name="Santiago Saoia"
          avatar={<Avatar shape="plain" character="estudiante-4" className="bg-transparent" />}
          progress={{ current: 3, total: 21 }}
          status="on-time"
        />
        <StudentCard
          name="Juana Molina"
          avatar={<Avatar shape="border" src={FOTO_URL} alt="Juana Molina" className="border-magenta bg-transparent" />}
          progress={{ current: 0, total: 21 }}
          status="on-time"
        />
      </Row>
      <Row label="Actividad grupal">
        <StudentCard
          mode="group-activity"
          name="Eric Bejarano"
          avatar={<Avatar shape="plain" character="estudiante-1" className="bg-transparent" />}
          activityStatus="active"
          code="luna"
        />
        <StudentCard
          mode="group-activity"
          name="Juan Manuel de Rosas"
          avatar={<Avatar shape="plain" character="estudiante-2" className="bg-transparent" />}
          activityStatus="waiting"
          code="nube"
        />
        <StudentCard
          mode="group-activity"
          name="Estela Robles"
          avatar={<Avatar shape="plain" character="estudiante-3" className="bg-transparent" />}
          activityStatus="waiting"
          code="cielo"
        />
        <StudentCard
          mode="group-activity"
          name="Santiago Saoia"
          avatar={<Avatar shape="plain" character="estudiante-4" className="bg-transparent" />}
          activityStatus="active"
          code="rayo"
        />
        <StudentCard
          mode="group-activity"
          name="Juana Molina"
          avatar={<Avatar shape="border" src={FOTO_URL} alt="Juana Molina" className="border-magenta bg-transparent" />}
          activityStatus="waiting"
          code="flor"
        />
      </Row>
    </div>
  ),
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-inter text-sm text-lightgray">{label}</span>
      <div className="flex flex-wrap gap-4">{children}</div>
    </div>
  );
}
