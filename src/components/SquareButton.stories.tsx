import type { Meta, StoryObj } from '@storybook/react';
import { SquareButton } from './SquareButton';
import { IconAvatarDocente } from './designerIcons';

const meta: Meta<typeof SquareButton> = {
  title: 'Componentes/Button',
  component: SquareButton,
  args: { label: 'Ingreso manual', description: 'Agrega estudiantes uno por uno completando un formulario' },
  argTypes: {
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof SquareButton>;

// Dos layouts según haya `icon` o no (ver comentario en SquareButton.tsx). Hover y
// Active son interacción real — pasá el mouse o mantené presionado cualquier
// botón "Enabled" para verlos, igual que en Basic button.
export const SquareButtonPage: Story = {
  name: 'Square button',
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col gap-4">
        <span className="text-xs font-inter text-white/60">Text only</span>
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-inter text-white/40">Enabled</span>
          <SquareButton {...args} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-inter text-white/40">Disabled</span>
          <SquareButton {...args} disabled />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs font-inter text-white/60">With icon</span>
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-inter text-white/40">Enabled</span>
          <SquareButton {...args} icon={<IconAvatarDocente className="size-full" />} description={undefined} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-inter text-white/40">Disabled</span>
          <SquareButton {...args} icon={<IconAvatarDocente className="size-full" />} description={undefined} disabled />
        </div>
      </div>
    </div>
  ),
};
