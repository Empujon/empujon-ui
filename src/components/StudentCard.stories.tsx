import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StudentCard } from './StudentCard';
import { Avatar } from './Avatar';

const meta: Meta<typeof StudentCard> = {
  title: 'Componentes/Cards',
  component: StudentCard,
};
export default meta;
type Story = StoryObj<typeof StudentCard>;

// Mismo estudiante (Eric Bejarano, personaje verde) en las 6 filas — una
// card por "Mode", no varias: el punto de esta story es comparar los modos
// entre sí, no mostrar variedad de personajes/avatares (eso puede cambiar
// más adelante). El avatar (80px desde el rediseño de sep 2026, antes 72px)
// ya no es un eje de variantes de Figma, es una instancia libre. Hover y
// Active se prueban pasando el mouse/clickeando cada card: son interacción
// real, no variantes aparte.
//
// Seis filas, un "Mode" cada una (los 6 de Figma):
// - Circuit on track / Circuit behind: progreso real.
// - Free: modo libre, sin barra de progreso — layout distinto a propósito
//   (avatar/tag pegados a los bordes, no agrupados al medio).
// - Group activity: pill de actividad + código de sala. Ya no hay
//   "Esperando" (esa variante la había inventado yo antes sin base real).
// - Pending / Unavailable: mismo `avatar` que las demás filas (nada de
//   placeholder aparte — pedido de Rocío), la card le agrega el aro de color
//   (amarillo/rojo) + badge por encima.
//   - Pending SÍ es cliqueable como el resto (fondo celeste en hover); su
//     tag "Iniciar medición" es un botón con su PROPIO hover/click
//     (`hover:`, no `group-hover:` — cambia solo al pasar el mouse por
//     encima del botón mismo) independiente del click de la card
//     (`onStartMeasurement` vs `onClick`).
//   - Unavailable NO es cliqueable (sin `onClick`, sin `hover:bg-blue`, sin
//     `active:` — la card no reacciona al mouse en absoluto). Solo su tag
//     "No disponible" tiene hover propio (mismo criterio que el botón de
//     Pending).
const AVATAR = <Avatar shape="plain" character="estudiante-1" size={80} />;

export const Student: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Row label="Circuit on track">
        <StudentCard mode="circuit-on-track" name="Eric Bejarano" avatar={AVATAR} progress={{ current: 5, total: 21 }} />
      </Row>
      <Row label="Circuit behind">
        <StudentCard mode="circuit-behind" name="Eric Bejarano" avatar={AVATAR} progress={{ current: 3, total: 21 }} />
      </Row>
      <Row label="Free">
        <StudentCard mode="free" name="Eric Bejarano" avatar={AVATAR} />
      </Row>
      <Row label="Group activity">
        <StudentCard mode="group-activity" name="Eric Bejarano" avatar={AVATAR} code="luna" />
      </Row>
      <Row label="Pending">
        <StudentCard
          mode="pending"
          name="Eric Bejarano"
          avatar={AVATAR}
          onClick={() => console.log('StudentCard onClick: abriría el perfil')}
          onStartMeasurement={() => console.log('StudentCard onStartMeasurement: arranca la medición')}
        />
      </Row>
      <Row label="Unavailable">
        <StudentCard
          mode="unavailable"
          name="Eric Bejarano"
          avatar={AVATAR}
          onClick={() => console.log('StudentCard (unavailable) onClick: click en "No disponible"')}
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
