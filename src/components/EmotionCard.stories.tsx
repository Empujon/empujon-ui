import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmotionCard } from './EmotionCard';
import { IconCansancio, IconCansancioSeleccionado } from './emotionIcons';

/** Layout "acostado" del componente Emociones (Figma › component set "Emociones acostado"). */
const meta: Meta<typeof EmotionCard> = {
  title: 'Componentes/EmotionSelector',
  component: EmotionCard,
  args: {
    label: 'Desaparecían muy lento',
    selected: false,
  },
};
export default meta;
type Story = StoryObj<typeof EmotionCard>;

// Solo "Cansadx" está construida por ahora (ver Figma) — el resto de las emociones
// se suma más adelante siguiendo el mismo patrón (ícono default + ícono seleccionado).
export const Acostado: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(false);
    return (
      <div className="flex flex-col items-start gap-4">
        <p className="max-w-[360px] font-inter text-[14px] leading-normal text-divider">
          Pasá el cursor para ver el hover, hacé clic para seleccionar
        </p>
        <EmotionCard
          {...args}
          selected={selected}
          icon={selected ? <IconCansancioSeleccionado /> : <IconCansancio />}
          onClick={() => setSelected((v) => !v)}
        />
      </div>
    );
  },
};
