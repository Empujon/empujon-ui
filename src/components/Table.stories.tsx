import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TableRow, TableHeader, TableFooter, NotificationTable } from './Table';
import { Avatar } from './Avatar';
import { Button } from './Button';

const meta: Meta<typeof TableRow> = { title: 'Componentes/Table', component: TableRow };
export default meta;
type Story = StoryObj<typeof TableRow>;

export const Playground: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const toggle = (id: string) =>
      setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
    const rows = [
      { id: '1', title: 'Eric Bejarano', subtitle: '2do grado', status: 'active' as const },
      { id: '2', title: 'Juan Manuel', subtitle: '3er grado', status: 'pending' as const },
      { id: '3', title: 'Estela Robles', subtitle: '1er grado', status: 'requires-action' as const },
    ];
    return (
      <div className="flex w-[500px] flex-col gap-2">
        <TableHeader columns={['Nombre', 'Estado']} selectable />
        {rows.map((row) => (
          <TableRow
            key={row.id}
            avatar={
              <Avatar shape="plain" size={44}>
                <span className="font-shantell text-lg text-whitesmoke">{row.title[0]}</span>
              </Avatar>
            }
            title={row.title}
            subtitle={row.subtitle}
            status={row.status}
            selectable
            selected={selected.includes(row.id)}
            onToggleSelect={() => toggle(row.id)}
          />
        ))}
        <TableFooter>
          <Button size="sm">Exportar</Button>
          <Button size="sm" variant="secondary-dark">Eliminar</Button>
        </TableFooter>
        <NotificationTable variant="success" message="3 estudiantes actualizados correctamente." />
      </div>
    );
  },
};
