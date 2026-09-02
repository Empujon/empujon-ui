import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

// Fiel al Figma "SISTEMA DE DISEÑO" › sección "Radio button" (node 6862:1988).
// Hover y Selected NO se muestran como filas estáticas aparte: son interacción
// real sobre "Enabled" y "Error" — clickeá para marcar, pasá el mouse para ver
// el hover (celeste) y el hover-marcado (celeste con el punto).
//
// El nombre de la story es "RadioButton" (no "Radio") a propósito: si fuera
// idéntico al título ("Radio"), Storybook fusiona carpeta+story en una fila
// plana ("single-story hoisting", ver el mismo comentario en Tag.stories.tsx).
const meta: Meta<typeof Radio> = {
  title: 'Componentes/Radio',
  component: Radio,
};
export default meta;
type Story = StoryObj<typeof Radio>;

function Row({
  checked,
  onChange,
  name,
  disabled,
  error,
}: {
  checked: boolean;
  onChange: () => void;
  name: string;
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

  // Un radio nativo no se puede "destildar" clickeándolo de nuevo (a diferencia
  // del checkbox) — eso es a propósito en producción. Para que la demo permita
  // ir y volver entre deseleccionado/seleccionado, el toggle se maneja en el
  // click del <label> (que siempre dispara) en vez del onChange del <input>.
  return (
    <label
      className={`group inline-flex w-fit items-center gap-2 ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
      onClick={(e) => {
        if (disabled) return;
        e.preventDefault();
        onChange();
      }}
    >
      <Radio
        checked={checked}
        onChange={() => {}}
        name={name}
        disabled={disabled}
        error={error}
        tone="orange"
        size="sm"
        ariaLabel="Me distraje"
      />
      <span className={`font-inter text-base font-semibold transition-colors ${labelClassName}`}>Me distraje</span>
    </label>
  );
}

export const RadioButton: Story = {
  name: 'RadioButton',
  render: () => {
    const [enabledChecked, setEnabledChecked] = useState(false);
    const [errorChecked, setErrorChecked] = useState(false);
    return (
      <div className="flex flex-col gap-4 rounded-xl bg-black p-6">
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Enabled</span>
          <Row checked={enabledChecked} onChange={() => setEnabledChecked((v) => !v)} name="demo-enabled" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Error</span>
          <Row checked={errorChecked} onChange={() => setErrorChecked((v) => !v)} name="demo-error" error />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Disabled</span>
          <Row checked={false} onChange={() => {}} name="demo-disabled" disabled />
        </div>
      </div>
    );
  },
};
