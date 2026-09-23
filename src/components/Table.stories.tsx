import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { TableStudentRow, TableHeader, TableHeaderAddButton, TableHeaderSelector } from './Table';

const meta: Meta = { title: 'Componentes/Table' };
export default meta;

export const StudentRow: StoryObj<typeof TableStudentRow> = {
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

const FILTER_OPTIONS = [
  { value: 'todos', label: 'Todos los estudiantes' },
  { value: 'pendientes', label: 'Consentimiento pendiente' },
  { value: 'no-consintio', label: 'No consintió' },
];
const SORT_OPTIONS = [
  { value: 'nombre', label: 'Nombre' },
  { value: 'actividad', label: 'Última actividad' },
];

export const Header: StoryObj<typeof TableHeader> = {
  args: { total: 23, selectedCount: 0, selectDisabled: false, searchPlaceholder: 'Buscar' },
  argTypes: {
    filterOptions: { table: { disable: true } },
    sortOptions: { table: { disable: true } },
    filterValue: { table: { disable: true } },
    sortValue: { table: { disable: true } },
    searchValue: { table: { disable: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    const [filter, setFilter] = useState('todos');
    const [sort, setSort] = useState('nombre');
    const [search, setSearch] = useState('');
    return (
      <div className="w-full max-w-[1032px]">
        <TableHeader
          {...args}
          filterOptions={FILTER_OPTIONS}
          filterValue={filter}
          onFilterChange={setFilter}
          sortOptions={SORT_OPTIONS}
          sortValue={sort}
          onSortChange={setSort}
          searchValue={search}
          onSearchChange={setSearch}
          onToggleSelectAll={() => updateArgs({ selectedCount: args.selectedCount >= args.total ? 0 : args.total })}
        />
      </div>
    );
  },
};

export const HeaderSelector: StoryObj<typeof TableHeaderSelector> = {
  name: 'Header Selector',
  args: { total: 23, selectedCount: 0, disabled: false },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <TableHeaderSelector
        {...args}
        onToggleSelectAll={() => updateArgs({ selectedCount: args.selectedCount >= args.total ? 0 : args.total })}
      />
    );
  },
};

export const HeaderAddButton: StoryObj<typeof TableHeaderAddButton> = {
  name: 'Header Add Button',
  args: { label: 'Agregar' },
  render: (args) => <TableHeaderAddButton {...args} />,
};
