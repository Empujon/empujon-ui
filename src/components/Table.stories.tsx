import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { TableStudentRow } from './Table';

const meta: Meta<typeof TableStudentRow> = { title: 'Componentes/Table', component: TableStudentRow };
export default meta;
type Story = StoryObj<typeof TableStudentRow>;

export const StudentRow: Story = {
  name: 'Student Row',
  args: {
    name: 'Eric Bejarano',
    status: 'active',
    activity: 'Última actividad: Hace 1 semana',
    character: 'estudiante-2',
    selectable: true,
    selected: false,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div className="w-full max-w-[1032px]">
        <TableStudentRow {...args} onToggleSelect={() => updateArgs({ selected: !args.selected })} />
      </div>
    );
  },
};
