import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StudentCard } from './StudentCard';
import { Avatar } from './Avatar';

// Foto real para el caso "con foto" (Figma: Avatar shape=border, borde
// magenta en vez del whitesmoke default — node 6916:2403).
const FOTO_URL = 'https://i.pravatar.cc/150?img=47';

const meta: Meta<typeof StudentCard> = {
  title: 'Componentes/Cards',
  component: StudentCard,
};
export default meta;
type Story = StoryObj<typeof StudentCard>;

// El avatar (80px desde el rediseño de sep 2026, antes 72px) ya no es un eje
// de variantes de Figma — es una instancia libre (estudiante 1-4 / iniciales
// / foto), por eso cada card de acá abajo prueba un personaje distinto nomás
// para mostrar variedad, no porque el "theme" cambie el modo. Hover y Active
// se prueban pasando el mouse/clickeando cada card: son interacción real, no
// variantes aparte.
//
// Seis filas, un "Mode" cada una (los 6 de Figma):
// - Circuit on track / Circuit behind: progreso real, traen los 5 personajes.
// - Free: modo libre, sin barra de progreso — layout distinto a propósito
//   (avatar/tag pegados a los bordes, no agrupados al medio).
// - Group activity: pill de actividad + código de sala. Ya no hay
//   "Esperando" (esa variante la había inventado yo antes sin base real).
// - Measurement pending / Unavailable: `avatar` es siempre el placeholder
//   fijo del catálogo (`character="medicion-pendiente"` / `"consentimiento-
//   pendiente"`), Figma solo muestra un ejemplo de cada uno (no varía por
//   personaje). Measurement pending no reacciona nunca al hover/active
//   (salvo el borde al seleccionar); Unavailable sí cambia de fondo en
//   hover como el resto, y su tag queda celeste tanto en hover como en
//   active (no vuelve al gris idle).
export const Student: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Row label="Circuit on track">
        <StudentCard
          mode="circuit-on-track"
          name="Eric Bejarano"
          avatar={<Avatar shape="plain" character="estudiante-1" size={80} className="bg-transparent" />}
          progress={{ current: 5, total: 21 }}
        />
        <StudentCard
          mode="circuit-on-track"
          name="Estela Robles"
          avatar={<Avatar shape="plain" character="estudiante-3" size={80} className="bg-transparent" />}
          progress={{ current: 0, total: 21 }}
        />
        <StudentCard
          mode="circuit-on-track"
          name="Juana Molina"
          avatar={<Avatar shape="border" src={FOTO_URL} alt="Juana Molina" size={80} className="border-magenta bg-transparent" />}
          progress={{ current: 12, total: 21 }}
        />
      </Row>
      <Row label="Circuit behind">
        <StudentCard
          mode="circuit-behind"
          name="Juan Manuel de Rosas"
          avatar={<Avatar shape="plain" character="estudiante-2" size={80} className="bg-transparent" />}
          progress={{ current: 3, total: 21 }}
        />
        <StudentCard
          mode="circuit-behind"
          name="Santiago Saoia"
          avatar={<Avatar shape="plain" character="estudiante-4" size={80} className="bg-transparent" />}
          progress={{ current: 3, total: 21 }}
        />
      </Row>
      <Row label="Free">
        <StudentCard
          mode="free"
          name="Eric Bejarano"
          avatar={<Avatar shape="plain" character="estudiante-1" size={80} className="bg-transparent" />}
        />
        <StudentCard
          mode="free"
          name="Juan Manuel de Rosas"
          avatar={<Avatar shape="plain" character="estudiante-2" size={80} className="bg-transparent" />}
        />
      </Row>
      <Row label="Group activity">
        <StudentCard
          mode="group-activity"
          name="Eric Bejarano"
          avatar={<Avatar shape="plain" character="estudiante-1" size={80} className="bg-transparent" />}
          code="luna"
        />
        <StudentCard
          mode="group-activity"
          name="Estela Robles"
          avatar={<Avatar shape="plain" character="estudiante-3" size={80} className="bg-transparent" />}
          code="cielo"
        />
        <StudentCard
          mode="group-activity"
          name="Juana Molina"
          avatar={<Avatar shape="border" src={FOTO_URL} alt="Juana Molina" size={80} className="border-magenta bg-transparent" />}
          code="flor"
        />
      </Row>
      <Row label="Measurement pending">
        <StudentCard
          mode="measurement-pending"
          name="Lucas Cabrera"
          avatar={<Avatar character="medicion-pendiente" size={80} />}
          onClick={() => {}}
        />
      </Row>
      <Row label="Unavailable">
        <StudentCard
          mode="unavailable"
          name="Mora Aguirre"
          avatar={<Avatar character="consentimiento-pendiente" size={80} />}
          onClick={() => {}}
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
