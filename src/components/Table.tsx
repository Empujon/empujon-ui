'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * Table — primitivas de tabla de gestión (Figma › "Table"). Gap 100% nuevo, pero
 * ADVERTENCIA: la implementación real que ya existe en `empujon/frontend`
 * (`StudentManageRow.tsx`, `ManagementListHeader.tsx`, `ActionsFooter.tsx`) es mucho
 * más rica — deriva un meta-estado rojo/amarillo/verde a partir de varios campos de
 * dominio (consentimiento, actividad, etc), algo que no tiene sentido generalizar acá
 * sin ese contexto de producto. Estas son primitivas genéricas (fila con
 * avatar+título+status+acciones, header, footer) para casos más simples — NO
 * reemplazan esa implementación.
 */
export interface TableRowProps {
  avatar?: React.ReactNode;
  title: string;
  subtitle?: string;
  status?: 'active' | 'pending' | 'requires-action';
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
  actions?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const statusPip = {
  active: 'bg-green',
  pending: 'bg-yellow',
  'requires-action': 'bg-red',
} as const;

export function TableRow({ avatar, title, subtitle, status, selectable, selected, onToggleSelect, actions, onClick, className }: TableRowProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group flex w-full items-center gap-4 rounded-2xl border-2 p-3 transition-colors',
        selected ? 'border-blue bg-darker-gray' : 'border-transparent hover:bg-darker-gray',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {selectable && (
        <input
          type="checkbox"
          checked={!!selected}
          onChange={onToggleSelect}
          onClick={(e) => e.stopPropagation()}
          className="size-5 accent-orange"
        />
      )}
      {avatar && (
        <span className="relative shrink-0 size-11">
          <span className="block size-11 overflow-hidden rounded-[20px]">{avatar}</span>
          {status && <span className={cn('absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-black', statusPip[status])} />}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="truncate font-inter font-semibold text-[16px] text-whitesmoke">{title}</p>
        {subtitle && <p className="truncate font-inter font-medium text-[14px] text-lightgray">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export interface TableHeaderProps {
  columns: string[];
  selectable?: boolean;
  allSelected?: boolean;
  onToggleSelectAll?: () => void;
  className?: string;
}

export function TableHeader({ columns, selectable, allSelected, onToggleSelectAll, className }: TableHeaderProps) {
  return (
    <div className={cn('flex w-full items-center gap-4 border-b-2 border-divider px-3 py-2', className)}>
      {selectable && (
        <input type="checkbox" checked={!!allSelected} onChange={onToggleSelectAll} className="size-5 accent-orange" />
      )}
      {columns.map((col) => (
        <span key={col} className="flex-1 font-inter font-semibold text-[14px] tracking-[0.14px] text-lightgray">
          {col}
        </span>
      ))}
    </div>
  );
}

export interface TableFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function TableFooter({ children, className }: TableFooterProps) {
  return (
    <div className={cn('flex w-full items-center justify-center gap-4 rounded-2xl bg-darker-gray p-4', className)}>
      {children}
    </div>
  );
}

export interface NotificationTableProps {
  variant: 'success' | 'warning';
  message: string;
  className?: string;
}

export function NotificationTable({ variant, message, className }: NotificationTableProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl p-4 font-inter font-semibold text-[16px]',
        variant === 'success' ? 'bg-green text-black' : 'bg-yellow text-black',
        className,
      )}
    >
      {message}
    </div>
  );
}

export default TableRow;
