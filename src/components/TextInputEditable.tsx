'use client';

// TextInputEditable — fila de texto editable en línea, con lápiz/check +
// copiar a la derecha. Fiel al Figma "SISTEMA DE DISEÑO" › Text Input
// (Editable) (component set, node 7851:4071): State=Default/Editing.
//
// Label a la izquierda (no editable, hasta 300px, se achica/trunca en vez de
// romper el layout en pantallas chicas), campo editable al medio (borde
// celeste solo en edición, min 270px) y dos Icon Button circulares a la
// derecha: el primero alterna lápiz (editar) / check naranja (confirmar)
// según el estado; el segundo (copiar) es fijo en los dos estados. En mobile
// (<768px) el label pasa a su propia fila arriba — mismo criterio que
// DateRangePicker — y el campo+botones nunca caben con label al lado ahí.

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/cn';
import { IconPencilFilled, IconCheck, IconCopy } from './designerIcons';

export interface TextInputEditableProps {
  /** Texto fijo a la izquierda (no editable) — p.ej. el nombre real de la persona. */
  label: string;
  value: string;
  onSave: (value: string) => void;
  /** Si no se pasa, el botón de copiar copia `value` al portapapeles. */
  onCopy?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function TextInputEditable({
  label,
  value,
  onSave,
  onCopy,
  disabled = false,
  className,
}: TextInputEditableProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editing) return;
    setDraft(value);
    const id = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const commit = () => {
    onSave(draft);
    setEditing(false);
  };

  const handleCopy = () => {
    if (onCopy) onCopy(value);
    else if (typeof navigator !== 'undefined' && navigator.clipboard) navigator.clipboard.writeText(value);
  };

  return (
    // Sin max-width propio: el ancho lo pone el contenedor. En el Figma la
    // fila mide 680 porque su bloque mide 680, no porque el componente se
    // tope ahí — y con el tope adentro la fila no llegaba al borde de un
    // contenedor más ancho, rompiendo la alineación con el resto de la
    // sección.
    <div className={cn('flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full', className)}>
      <span className="md:w-[300px] md:shrink-0 truncate font-inter font-semibold text-label-chico text-lightgray">
        {label}
      </span>

      {/* Campo + botones van siempre en una fila propia — en mobile esta fila
          se apila DEBAJO del label (mismo criterio que DateRangePicker con
          su breakpoint md), así el nombre nunca queda a 0 de ancho ni los
          botones se salen de la pantalla. */}
      {/* flex-1: este grupo se estira hasta el borde derecho del contenedor.
          Sin esto el label (que sí crecía) se llevaba el sobrante y los
          botones quedaban cortos, sin alinear con el resto de la sección. */}
      <div className="flex flex-1 items-center gap-4 min-w-0">
        <div
          className={cn(
            // El mínimo de 270px es del Figma, pero sólo desde md: en un
            // viewport de 390 la fila (270 + 2×44 + gaps) pedía 390px sobre
            // 358 disponibles y los botones se salían por la derecha, que
            // es justo lo que el apilado del label venía a evitar.
            'flex-1 min-w-0 md:min-w-[270px] h-[44px] px-4 rounded-[16px] bg-darker-gray flex items-center transition-colors',
            editing && 'border-2 border-blue',
          )}
        >
          {editing ? (
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commit();
                if (e.key === 'Escape') setEditing(false);
              }}
              onBlur={commit}
              className="w-full bg-transparent font-inter font-semibold text-label-chico text-whitesmoke focus:outline-none"
            />
          ) : (
            <span className="truncate font-inter font-semibold text-label-chico text-whitesmoke">{value}</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => !disabled && (editing ? commit() : setEditing(true))}
          disabled={disabled}
          aria-label={editing ? 'Confirmar' : 'Editar'}
          className={cn(
            'flex items-center justify-center shrink-0 size-11 rounded-pill transition-colors',
            disabled
              ? 'bg-darker-gray text-divider cursor-not-allowed'
              : editing
                ? 'bg-orange text-black enabled:hover:bg-blue'
                : 'bg-darker-gray text-whitesmoke enabled:hover:bg-blue enabled:hover:text-black',
          )}
        >
          <span className="inline-flex items-center justify-center size-8">
            {editing ? <IconCheck className="w-full h-full" /> : <IconPencilFilled className="w-full h-full" />}
          </span>
        </button>

        <button
          type="button"
          onClick={handleCopy}
          disabled={disabled}
          aria-label="Copiar"
          className={cn(
            'flex items-center justify-center shrink-0 size-11 rounded-pill bg-darker-gray transition-colors',
            disabled ? 'text-divider cursor-not-allowed' : 'text-whitesmoke enabled:hover:bg-blue enabled:hover:text-black',
          )}
        >
          <span className="inline-flex items-center justify-center size-8">
            <IconCopy className="w-full h-full" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default TextInputEditable;

// ── Metadata de bloque (page builder) ──────────────────────────────────────────
import type { UiBlockMeta } from '../block-meta';

export const textInputEditableBlockMeta: UiBlockMeta = {
  type: 'ui:text-input-editable',
  label: 'Campo editable en línea',
  icon: 'TextCursorInput',
  exportName: 'TextInputEditable',
  controlled: { valueProp: 'value', onChangeProp: 'onSave', initial: '' },
  props: {
    label: { control: 'text', label: 'Etiqueta', default: 'Etiqueta' },
    disabled: { control: 'boolean', label: 'Deshabilitado', default: false },
  },
};
