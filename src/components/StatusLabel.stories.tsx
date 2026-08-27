import type { Meta, StoryObj } from '@storybook/react';
import { StatusLabel } from './StatusLabel';

// Componente aparte del Chip interactivo (ex "Tag") — ver Chip.stories.tsx.
// Fiel al Figma "SISTEMA DE DISEÑO" › sección "Status label" (node 7671:5997).
const meta: Meta<typeof StatusLabel> = {
  title: 'Componentes/Status Label',
  component: StatusLabel,
};
export default meta;
type Story = StoryObj<typeof StatusLabel>;

const VARIANTS = [
  { variant: 'success', label: 'Success' },
  { variant: 'error', label: 'Error' },
  { variant: 'alert', label: 'Alert' },
  { variant: 'info', label: 'Info' },
  { variant: 'neutral', label: 'Neutral' },
] as const;

// Grilla completa (Variant × Background, con y sin punto) para contrastar
// 1:1 contra el component set de Figma.
export const StatusLabelStory: Story = {
  name: 'Status label',
  render: () => (
    <div className="flex flex-col gap-4 rounded-xl bg-black p-6">
      {(
        [
          { background: 'grey', legend: 'Gray background' },
          { background: 'color', legend: 'Color background' },
        ] as const
      ).map(({ background, legend }) => (
        <div key={background} className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">{legend}</span>
          <div className="flex flex-wrap items-center gap-3">
            {VARIANTS.map(({ variant, label }) => (
              <StatusLabel key={variant} variant={variant} background={background}>
                {label}
              </StatusLabel>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <span className="font-inter text-xs text-white/60">No icon</span>
        <div className="flex flex-wrap items-center gap-3">
          {VARIANTS.map(({ variant, label }) => (
            <StatusLabel key={variant} variant={variant} showIcon={false}>
              {label}
            </StatusLabel>
          ))}
        </div>
      </div>
    </div>
  ),
};
