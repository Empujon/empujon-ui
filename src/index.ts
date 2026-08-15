// @empujon/ui — sistema de diseño de Empujón.
// Componentes base reutilizables por cualquier frontend de la organización.
export { cn } from './lib/cn';
export { Button, buttonVariants, type ButtonProps } from './components/Button';
export { Spinner, type SpinnerProps } from './components/Spinner';
export { LoadingSpinner, type LoadingSpinnerProps } from './components/LoadingSpinner';
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
export { Countdown, type CountdownProps } from './components/Countdown';
export { TrainerHeader, type TrainerHeaderProps } from './components/TrainerHeader';
export {
  EmotionSelector,
  EMPUJON_EMOTIONS,
  type EmotionItem,
  type EmotionSelectorProps,
} from './components/EmotionSelector';
export {
  IconEntusiasmo,
  IconFelicidad,
  IconCalma,
  IconConfianza,
  IconConfusion,
  IconCansancio,
  IconNervios,
  IconFrustracion,
  IconTristeza,
  IconEnojo,
  IconAburrimiento,
} from './components/emotionIcons';
export { Slider, type SliderProps } from './components/Slider';
export { Switch, type SwitchProps } from './components/Switch';
export {
  SegmentedControl,
  type SegmentedControlProps,
  type SegmentedOption,
} from './components/SegmentedControl';
export { NumberInput, type NumberInputProps } from './components/NumberInput';
export { Tooltip, type TooltipProps } from './components/Tooltip';
export { Search, type SearchProps } from './components/Search';
export { Pagination, type PaginationProps } from './components/Pagination';
export { TabBar, type TabItem, type TabBarProps } from './components/TabBar';
export { Dropdown, type DropdownItem, type DropdownProps } from './components/Dropdown';
export { Avatar, type AvatarProps, type AvatarCharacter } from './components/Avatar';
export { Breadcrumb, type BreadcrumbItem, type BreadcrumbProps } from './components/Breadcrumb';
export {
  BreadcrumbSelect,
  type BreadcrumbSelectOption,
  type BreadcrumbSelectProps,
} from './components/BreadcrumbSelect';
export { Accordion, type AccordionProps } from './components/Accordion';
export { Mic, type MicProps } from './components/Mic';
export { Pill, type PillProps } from './components/Pill';
export { StudentCard, type StudentCardProps } from './components/StudentCard';
export { RoundButton, type RoundButtonProps } from './components/RoundButton';
export { IconButton, type IconButtonProps } from './components/IconButton';
export { CardActionButton, type CardActionButtonProps } from './components/CardActionButton';
export { CardButton, type CardButtonProps } from './components/CardButton';
export { SquareButton, type SquareButtonProps } from './components/SquareButton';
export { SuperButton, type SuperButtonProps } from './components/SuperButton';
export { ImageCard, type ImageCardProps } from './components/ImageCard';
export { ProfileCard, type ProfileCardProps } from './components/ProfileCard';
export { FeedbackChip, type FeedbackChipProps } from './components/FeedbackChip';
export { Estampita, type EstampitaProps } from './components/Estampita';
export {
  TableRow,
  TableHeader,
  TableFooter,
  NotificationTable,
  type TableRowProps,
  type TableHeaderProps,
  type TableFooterProps,
  type NotificationTableProps,
} from './components/Table';
export { ChatBubble, ChatInputBar, type ChatBubbleProps, type ChatInputBarProps } from './components/Chat';
export {
  CircuitPath,
  type CircuitPathProps,
  type CircuitNodeItem,
  type CircuitNodeStatus,
} from './components/CircuitPath';
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
