// @empujon/ui — sistema de diseño de Empujón.
// Componentes base reutilizables por cualquier frontend de la organización.
export { cn } from './lib/cn';
export { Button, buttonVariants, type ButtonProps } from './components/Button';
export { Spinner, type SpinnerProps } from './components/Spinner';
export {
  DotsLoader,
  ProgressDots,
  type DotsLoaderProps,
  type ProgressDotsProps,
} from './components/Loading';
export {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  type CardProps,
} from './components/Card';
export { Badge, type BadgeProps } from './components/Badge';
export { Notification, type NotificationProps } from './components/Notification';
export { Modal, type ModalProps } from './components/Modal';
export {
  DatePicker,
  type DatePickerLocale,
  type DateRange,
} from './components/DatePicker';
export { DateRangePicker } from './components/DateRangePicker';

// Controles de selección (formularios).
export { Radio, type RadioProps } from './components/Radio';
export { Checkbox, type CheckboxProps } from './components/Checkbox';
export { Choice, type ChoiceProps } from './components/Choice';
export {
  OptionPills,
  type OptionPillsProps,
  type OptionPillItem,
} from './components/OptionPills';
export { Input, type InputProps } from './components/Input';
export { TextArea, type TextAreaProps } from './components/TextArea';
export { Select, type SelectProps, type SelectOption } from './components/Select';

// Compositores de chrome (header/footer/menú). Presentacionales: la lógica
// (auth, roles, navegación, push del chat) la inyecta la app por slots + style.
export { Navbar, type NavbarProps } from './components/Navbar';
export { Footer, type FooterProps, type FooterLink } from './components/Footer';
export {
  CurtainMenu,
  type CurtainMenuProps,
  type CurtainMenuItem,
} from './components/CurtainMenu';
export { HamburgerMenu, type HamburgerMenuProps } from './components/HamburgerMenu';

// Metadata de bloques para page builders. También disponible en el subpath
// '@empujon/ui/blocks' (tree-shakeable, sin arrastrar componentes).
export { uiBlocks } from './blocks';
export type { UiBlockMeta, UiPropMeta } from './block-meta';
