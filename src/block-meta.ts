// Metadata de bloque — formato NEUTRO propio de @empujon/ui.
//
// Describe qué props de un componente son editables desde un page builder, de forma
// independiente de cualquier consumidor. El page builder (u otra herramienta) traduce
// este vocabulario a su propio esquema de controles.
//
// Un componente se vuelve "bloque" con solo exportar su `blockMeta` y registrarlo en
// `src/blocks.ts`. Los componentes que NO deben ser bloques (Modal, DatePicker, …)
// simplemente no exportan/registran metadata.

/** Un prop editable, descrito de forma neutra. */
export type UiPropMeta =
  | { control: 'enum'; label: string; options: string[]; default?: string }
  | { control: 'boolean'; label: string; default?: boolean }
  | { control: 'text'; label: string; default?: string; inline?: boolean }
  | { control: 'number'; label: string; default?: number; min?: number; max?: number };

/** Metadata de un componente expuesto como bloque. */
export interface UiBlockMeta {
  /** Id estable guardado en el JSON de la página. Convención: 'ui:button'. NUNCA renombrar. */
  type: string;
  /** Etiqueta legible en la paleta del editor. */
  label: string;
  /** Nombre de ícono lucide-react (opcional). */
  icon?: string;
  /** Nombre del export del componente en la lib (ej. 'Button'). Evita convenciones frágiles. */
  exportName: string;
  /** Prop que recibe el texto/children editable inline en el lienzo (si aplica). */
  childrenProp?: string;
  /**
   * Para componentes CONTROLADOS (value + onChange obligatorios). Le dice al
   * consumidor (el wrapper del builder) que inyecte estado local: así el widget
   * es interactivo en la vitrina/landing sin lógica de formulario real. Presentacional.
   */
  controlled?: {
    /** Prop que recibe el valor (ej. 'checked', 'value'). */
    valueProp: string;
    /** Prop callback de cambio (ej. 'onChange'). */
    onChangeProp: string;
    /** Valor inicial del estado local. */
    initial: boolean | string;
  };
  /** Props editables → controles. */
  props: Record<string, UiPropMeta>;
}
