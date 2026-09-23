import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { TableHeader } from './Table';

// Mismo `title` que Table.stories.tsx: Storybook junta los dos archivos en la
// misma carpeta. Va en archivo aparte para que cada uno tenga su `component`
// y los Controls salgan bien (opciones de status, personaje, etc.).
const meta: Meta<typeof TableHeader> = { title: 'Componentes/Table', component: TableHeader };
export default meta;

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
