// Registro de bloques del design system para page builders.
//
// Índice explícito de los componentes que se exponen como bloques arrastrables.
// Agregar un componente nuevo como bloque = importar su `*BlockMeta` acá.
// Los componentes que NO deben ser bloques de landing (Modal, DatePicker,
// DateRangePicker) simplemente no se listan.

import type { UiBlockMeta } from './block-meta';
import { buttonBlockMeta } from './components/Button';
import { cardBlockMeta } from './components/Card';
import { notificationBlockMeta } from './components/Notification';
import { spinnerBlockMeta } from './components/Spinner';
import { dotsBlockMeta, progressBlockMeta } from './components/Loading';
import { checkboxBlockMeta } from './components/Checkbox';
import { radioBlockMeta } from './components/Radio';
import { choiceBlockMeta } from './components/Choice';
import { inputBlockMeta } from './components/Input';
import { textAreaBlockMeta } from './components/TextArea';
import { selectBlockMeta } from './components/Select';
import { statusLabelBlockMeta } from './components/StatusLabel';

export const uiBlocks: UiBlockMeta[] = [
  buttonBlockMeta,
  cardBlockMeta,
  notificationBlockMeta,
  spinnerBlockMeta,
  dotsBlockMeta,
  progressBlockMeta,
  // Controles de selección / formulario (presentacionales en el builder).
  checkboxBlockMeta,
  radioBlockMeta,
  choiceBlockMeta,
  inputBlockMeta,
  textAreaBlockMeta,
  selectBlockMeta,
  // Aparte, al final a propósito (ver StatusLabel.tsx).
  statusLabelBlockMeta,
];

export type { UiBlockMeta, UiPropMeta } from './block-meta';
