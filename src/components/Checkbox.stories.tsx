import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

// Fiel al Figma "SISTEMA DE DISEÑO" › sección "Checkbox" (node 6777:1775).
// Hover y Selected NO se muestran como filas estáticas aparte: son interacción
// real sobre "Enabled" y "Error" — clickeá para marcar/desmarcar, pasá el mouse
// para ver el hover (celeste) y el hover-marcado (celeste con el check).
//
// El nombre de la story es "checkbox" (minúscula) a propósito, ver el mismo
// comentario en Tag.stories.tsx sobre single-story hoisting de Storybook.
const meta: Meta<typeof Checkbox> = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

function Row({
  checked,
  onChange,
  disabled,
  error,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  error?: boolean;
}) {
  // Sin marcar: blanco (o rojo si error). Marcado: siempre blanco. En hover
  // (marcado o no, enabled o error) el label pasa a celeste, igual que el control.
  const labelClassName = disabled
    ? 'text-divider'
    : !checked && error
      ? 'text-red group-hover:text-blue'
      : 'text-white group-hover:text-blue';

  return (
    <label className={`group inline-flex w-fit items-center gap-2 ${disabled ? 'cursor-default' : 'cursor-pointer'}`}>
      <Checkbox
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        error={error}
        tone="orange"
        size="xs"
        ariaLabel="Me distraje"
      />
      <span className={`font-inter text-base font-semibold transition-colors ${labelClassName}`}>Me distraje</span>
    </label>
  );
}

export const CheckboxStory: Story = {
  name: 'checkbox',
  render: () => {
    const [enabledChecked, setEnabledChecked] = useState(false);
    const [errorChecked, setErrorChecked] = useState(false);
    return (
      <div className="flex flex-col gap-4 rounded-xl bg-black p-6">
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Enabled</span>
          <Row checked={enabledChecked} onChange={() => setEnabledChecked((v) => !v)} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Error</span>
          <Row checked={errorChecked} onChange={() => setErrorChecked((v) => !v)} error />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Disabled</span>
          <Row checked={false} onChange={() => {}} disabled />
        </div>
      </div>
    );
  },
};
