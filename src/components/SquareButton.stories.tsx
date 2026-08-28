import type { Meta, StoryObj } from '@storybook/react';
import { SquareButton } from './SquareButton';
import { IconAvatarDocente } from './designerIcons';

const meta: Meta<typeof SquareButton> = {
  title: 'Componentes/Button',
  component: SquareButton,
  args: { label: 'Ingreso manual', description: 'Agrega estudiantes uno por uno completando un formulario' },
  argTypes: {
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof SquareButton>;

// Dos layouts según haya `icon` o no (ver comentario en SquareButton.tsx). Hover es
// interacción real (pasá el mouse); acá se ven Default/Active(selected)/Disabled.
export const SquareButtonPage: Story = {
  name: 'Square button',
  render: (args) => (
    <div className="flex flex-wrap items-start gap-6">
      <div className="flex flex-col gap-4">
        <span className="text-xs font-inter text-white/60">Text only</span>
        <SquareButton {...args} />
        <SquareButton {...args} selected />
        <SquareButton {...args} disabled />
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs font-inter text-white/60">With icon</span>
        <SquareButton {...args} icon={<IconAvatarDocente className="size-full" />} description={undefined} />
        <SquareButton {...args} icon={<IconAvatarDocente className="size-full" />} description={undefined} selected />
        <SquareButton {...args} icon={<IconAvatarDocente className="size-full" />} description={undefined} disabled />
      </div>
    </div>
  ),
};
