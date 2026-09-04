'use client';

// OptionPills — opciones seleccionables tipo píldora (las de Chatama).
//
// Botones-píldora del design system (3 estados: default naranja / hover azul /
// seleccionado gris-claro + azul).
//  - radio: single-select, submite al click (sin icono de check).
//  - checkbox: multi-select con check cuadrado + botón "Listo".
//
// Presentacional + estado local de selección. El consumidor recibe la selección
// por onSubmit. Genérico (no depende del ChatProvider de empujón).

import React, { useState } from 'react';
import { cn } from '../lib/cn';

export interface OptionPillItem {
  label: string;
  value: string;
}

export interface OptionPillsProps {
  options: OptionPillItem[];
  selectionType: 'checkbox' | 'radio';
  onSubmit: (selected: OptionPillItem[]) => void;
  disabled?: boolean;
  submitLabel?: string;
  className?: string;
}

export function OptionPills({
  options,
  selectionType,
  onSubmit,
  disabled = false,
  submitLabel = 'Listo',
  className,
}: OptionPillsProps) {
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());
  const isRadio = selectionType === 'radio';

  const toggleOption = (value: string) => {
    if (disabled) return;
    if (isRadio) {
      const selected = options.find((o) => o.value === value);
      if (selected) {
        setSelectedValues(new Set([value]));
        onSubmit([selected]);
      }
      return;
    }
    setSelectedValues((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const handleSubmit = () => {
    if (selectedValues.size === 0 || disabled) return;
    onSubmit(options.filter((o) => selectedValues.has(o.value)));
  };

  return (
    <div className={cn('w-full mt-3', className)}>
      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selectedValues.has(option.value);
          return (
            <button
              key={option.value}
              onClick={() => toggleOption(option.value)}
              disabled={disabled}
              className={cn(
                // min-h + max-w-full + wrap: un label largo crece a lo alto y
                // jamás desborda el contenedor (antes h-11 fijo + w-fit libre).
                'flex items-center gap-2 min-h-11 px-4 py-2.5 rounded-full border-2 font-inter font-semibold text-base leading-6 tracking-[0.16px] transition-all w-fit max-w-full whitespace-normal break-words text-left',
                isSelected
                  ? 'bg-[#dde3dd] border-blue text-black'
                  : 'bg-dark-gray border-orange text-whitesmoke hover:border-blue hover:text-blue',
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
              )}
            >
              {!isRadio && (
                <span
                  className={cn(
                    'flex items-center justify-center w-5 h-5 rounded shrink-0 border-2 transition-all',
                    isSelected ? 'bg-blue border-blue' : 'border-current',
                  )}
                >
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="#171D17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              )}
              {option.label}
            </button>
          );
        })}
      </div>

      {!disabled && !isRadio && (
        <div className="flex justify-start mt-4">
          <button
            onClick={handleSubmit}
            disabled={selectedValues.size === 0}
            className={cn(
              // Disabled: mismo criterio que Button primary-dark (bg-gray-700 +
              // text-divider) en vez del opacity-40 que atenuaba el naranja/negro.
              'flex items-center gap-2 font-inter font-semibold py-2.5 px-4 h-11 rounded-full text-base leading-6 tracking-[0.16px] transition-all',
              selectedValues.size === 0
                ? 'bg-gray-700 text-divider cursor-not-allowed'
                : 'bg-orange text-black hover:brightness-110 cursor-pointer',
            )}
          >
            {submitLabel}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 rotate-180">
              <path d="M13.2435 4.74318C13.7322 4.74318 14.1424 4.91773 14.474 5.26682C14.8056 5.61591 14.9715 6.00864 14.9715 6.445C14.9715 6.65446 14.9365 6.84646 14.8667 7.021C14.7969 7.213 14.6922 7.41373 14.5525 7.62318C14.0115 8.30391 13.3918 8.86246 12.6936 9.29882C11.978 9.75264 11.2449 10.1541 10.4944 10.5032C9.72637 10.8523 9.02819 11.2014 8.39982 11.5505C7.77146 11.8995 7.274 12.3272 6.90746 12.8334L6.88128 10.7126C7.80637 11.8297 8.83618 12.8072 9.97073 13.645C11.1053 14.4828 12.3184 15.181 13.61 15.7395C13.994 15.9141 14.282 16.141 14.474 16.4203C14.666 16.6995 14.762 17.0486 14.762 17.4675C14.762 17.9214 14.5962 18.3054 14.2645 18.6195C13.9329 18.9337 13.5315 19.0908 13.0602 19.0908C12.9031 19.0908 12.7373 19.0646 12.5627 19.0123C12.3882 18.9774 12.1264 18.8814 11.7773 18.7243C10.4507 18.1483 9.12418 17.3454 7.79764 16.3155C6.47109 15.2857 5.26673 14.125 4.18455 12.8334C4.02746 12.6588 3.914 12.493 3.84419 12.3359C3.77437 12.1788 3.73946 11.9955 3.73946 11.7861C3.73946 11.6115 3.77437 11.4457 3.84419 11.2886C3.89655 11.1315 3.98382 10.9745 4.10601 10.8174C4.50746 10.2937 5.03109 9.84864 5.67691 9.48209C6.32273 9.133 7.02091 8.78391 7.77146 8.43482C8.50455 8.08573 9.22891 7.68428 9.94455 7.23046C10.6427 6.79409 11.2536 6.22682 11.7773 5.52864C11.9693 5.28427 12.1962 5.09227 12.458 4.95264C12.7198 4.813 12.9816 4.74318 13.2435 4.74318ZM12.9555 10.4508C13.1998 10.4508 13.4355 10.4595 13.6624 10.477C13.8893 10.5119 14.1685 10.5381 14.5002 10.5555C14.8318 10.573 15.2769 10.5817 15.8355 10.5817C16.3242 10.5817 16.7169 10.5643 17.0136 10.5294C17.3104 10.5119 17.5809 10.4857 17.8253 10.4508C18.0522 10.4159 18.3227 10.3985 18.6369 10.3985C19.1082 10.3985 19.4835 10.5294 19.7627 10.7912C20.042 11.0705 20.1816 11.4283 20.1816 11.8646C20.1816 12.3185 20.0507 12.7461 19.7889 13.1475C19.5271 13.5665 19.1431 13.8108 18.6369 13.8806C18.1656 13.933 17.6944 13.9766 17.2231 14.0115C16.7518 14.0465 16.2893 14.0639 15.8355 14.0639C15.3118 14.0639 14.7795 14.0465 14.2384 14.0115C13.6973 13.9766 13.1824 13.9243 12.6936 13.8545C12.1525 13.7497 11.7424 13.5315 11.4631 13.1999C11.1838 12.8857 11.0442 12.4755 11.0442 11.9694C11.0442 11.4806 11.2362 11.1054 11.6202 10.8435C12.0042 10.5817 12.4493 10.4508 12.9555 10.4508Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default OptionPills;
