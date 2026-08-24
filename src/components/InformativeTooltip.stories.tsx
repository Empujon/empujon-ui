import type { Meta, StoryObj } from '@storybook/react';
import { InformativeTooltip } from './InformativeTooltip';

/** Page "Informative" del componente Tooltip — correlacionada 1:1 con la sección "Informative" de Figma. */
const meta: Meta<typeof InformativeTooltip> = {
  title: 'Componentes/Tooltip',
  component: InformativeTooltip,
  args: {
    text: 'Tooltip text',
  },
  argTypes: {
    children: { table: { disable: true } },
    arrow: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof InformativeTooltip>;

/** Label "Shantell label M" con subrayado punteado que se resalta en hover/focus. */
function TriggerLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="cursor-default border-b-2 border-dashed border-transparent font-shantell text-label-medio font-semibold text-whitesmoke transition-colors hover:border-orange focus-visible:border-orange focus-visible:outline-none">
      {children}
    </span>
  );
}

// Layout en cruz con las 4 direcciones a la vez — igual a la última preview
// aprobada: un label por posición (Top/Left/Right/Bottom), cada uno con su
// propio InformativeTooltip que aparece con hover/focus real. `arrow` de cada
// uno apunta hacia esa posición (ej. el de arriba usa `bottom` porque el
// tooltip se abre hacia arriba, con la flecha señalando hacia abajo al label).
export const Informative: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-12 p-8">
      <p className="max-w-[360px] text-center font-inter text-[14px] leading-normal text-divider">
        Para previsualizar, pasá el cursor sobre cada label para ver el Informative Tooltip aparecer
      </p>
      <div className="grid grid-cols-[140px_140px_140px] grid-rows-[80px_80px_80px] place-items-center">
        <span />
        <InformativeTooltip {...args} arrow="bottom">
          <TriggerLabel>Top</TriggerLabel>
        </InformativeTooltip>
        <span />

        <InformativeTooltip {...args} arrow="left">
          <TriggerLabel>Left</TriggerLabel>
        </InformativeTooltip>
        <span />
        <InformativeTooltip {...args} arrow="right">
          <TriggerLabel>Right</TriggerLabel>
        </InformativeTooltip>

        <span />
        <InformativeTooltip {...args} arrow="top">
          <TriggerLabel>Bottom</TriggerLabel>
        </InformativeTooltip>
        <span />
      </div>
    </div>
  ),
};
