import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmotionCard } from './EmotionCard';
import {
  IconCansancio,
  IconCansancioSeleccionado,
  IconConfianza,
  IconConfianzaSeleccionado,
} from './emotionIcons';

/** Layout "acostado" del componente Emociones (Figma › component set "Emociones acostado"). */
const meta: Meta<typeof EmotionCard> = {
  title: 'Componentes/EmotionSelector',
  component: EmotionCard,
};
export default meta;
type Story = StoryObj<typeof EmotionCard>;

// Construidas en Figma por ahora: Cansadx, Confianza, Nervios — acá mostramos dos a
// modo de ejemplo (el patrón de ícono default + ícono seleccionado se repite igual
// para las que falten).
function DemoCard({
  label,
  icon,
  selectedIcon,
}: {
  label: string;
  icon: React.ReactNode;
  selectedIcon: React.ReactNode;
}) {
  const [selected, setSelected] = useState(false);
  return (
    <EmotionCard
      label={label}
      selected={selected}
      icon={selected ? selectedIcon : icon}
      onClick={() => setSelected((v) => !v)}
    />
  );
}

export const Acostado: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <p className="max-w-[360px] font-inter text-[14px] leading-normal text-divider">
        Pasá el cursor para ver el hover, hacé clic para seleccionar
      </p>
      <div className="flex flex-col gap-3">
        <DemoCard
          label="Desaparecían muy lento"
          icon={<IconCansancio />}
          selectedIcon={<IconCansancioSeleccionado />}
        />
        <DemoCard
          label="Iban a buen ritmo"
          icon={<IconConfianza />}
          selectedIcon={<IconConfianzaSeleccionado />}
        />
      </div>
    </div>
  ),
};
