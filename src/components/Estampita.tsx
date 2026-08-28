'use client';

import React from 'react';
import { cn } from '../lib/cn';

// Marco festoneado — Figma "Glifo Curso" (node 3277:6421 y análogos). MISMO path
// geométrico en las 3 variantes de curso/agregar y en los 3 estados; confirmado
// bajando los 3 assets exportados (default/hover/disabled) y diffeando el `d` —
// solo cambia el `fill`. Por eso vive una sola vez acá, normalizado a currentColor
// y recoloreado por CSS, igual criterio que designerIcons.tsx.
const ScallopFrame = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M120 25.7363C120 23.3714 119.04 21.2259 117.49 19.6767C115.941 18.1275 113.794 17.1678 111.429 17.1678C113.794 17.1678 115.941 16.2082 117.49 14.659C119.04 13.1098 120 10.9642 120 8.59934C120 6.23443 119.04 4.08888 117.49 2.5397C115.941 0.990518 113.794 0.0308466 111.429 0.0308466C109.063 0.0308466 106.917 0.990518 105.367 2.5397C103.817 4.08888 102.857 6.23443 102.857 8.59934C102.857 6.23443 101.897 4.08888 100.347 2.5397C98.7977 0.990518 96.6514 0.0308466 94.2857 0.0308466C91.92 0.0308466 89.7737 0.990518 88.224 2.5397C86.6743 4.08888 85.7211 6.2173 85.7143 8.56849C85.7143 6.20016 84.7543 4.06146 83.2046 2.50885C81.6549 0.959671 79.5086 0 77.1429 0C74.7771 0 72.6309 0.959671 71.0811 2.50885C69.5314 4.06146 68.5714 6.20016 68.5714 8.56849C68.568 6.20701 67.608 4.06489 66.0617 2.51914C64.5154 0.97338 62.3657 0.0102822 60 0.0102822C57.6343 0.0102822 55.488 0.969953 53.9383 2.51914C52.3886 4.06832 51.4286 6.21387 51.4286 8.57877C51.4251 6.21387 50.4651 4.0786 48.9189 2.52942C47.3691 0.980235 45.2229 0.0205644 42.8571 0.0205644C40.4914 0.0205644 38.3451 0.980235 36.7954 2.52942C35.2457 4.08203 34.2857 6.22072 34.2857 8.58906C34.2823 6.22758 33.3223 4.08546 31.776 2.5397C30.2263 0.990518 28.08 0.0308466 25.7143 0.0308466C23.3486 0.0308466 21.2023 0.990518 19.6526 2.5397C18.1029 4.08888 17.1429 6.23443 17.1429 8.59934C17.1394 6.23443 16.1794 4.09917 14.6331 2.54998C13.0834 1.0008 10.9371 0.0411288 8.57143 0.0411288C6.20571 0.0411288 4.05943 1.0008 2.50971 2.54998C0.96 4.10259 0 6.24129 0 8.60962C0 13.3429 3.83657 17.1781 8.57143 17.1781C6.20571 17.1781 4.05943 18.1378 2.50971 19.687C0.96 21.2396 0 23.3783 0 25.7466C0 30.4798 3.83657 34.3151 8.57143 34.3151C6.20571 34.3151 4.05943 35.2748 2.50971 36.8239C0.96 38.3766 0 40.5153 0 42.8836C0 47.6168 3.83657 51.4521 8.57143 51.4521C6.20571 51.4521 4.05943 52.4117 2.50971 53.9609C0.96 55.5135 0 57.6522 0 60.0206C0 64.7538 3.83657 68.5891 8.57143 68.5891C6.20571 68.5891 4.05943 69.5487 2.50971 71.0979C0.96 72.6505 0 74.7892 0 77.1575C0 81.8908 3.83657 85.726 8.57143 85.726C6.20571 85.726 4.05943 86.6857 2.50971 88.2349C0.96 89.7875 0 91.9262 0 94.2945C0 99.0278 3.83657 102.863 8.57143 102.863C6.20571 102.863 4.05943 103.823 2.50971 105.372C0.96 106.924 0 109.063 0 111.432C0 116.165 3.83657 120 8.57143 120C10.9371 120 13.0834 119.04 14.6331 117.491C16.1829 115.939 17.1429 113.8 17.1429 111.432C17.1497 116.161 20.9829 119.99 25.7143 119.99C28.08 119.99 30.2263 119.03 31.776 117.481C33.3257 115.932 34.2857 113.786 34.2857 111.421C34.2926 116.151 38.1257 119.979 42.8571 119.979C45.2229 119.979 47.3691 119.02 48.9189 117.471C50.4686 115.918 51.4286 113.779 51.4286 111.411C51.4354 116.137 55.2686 119.969 60 119.969C62.3657 119.969 64.512 119.009 66.0617 117.46C67.6114 115.908 68.5714 113.766 68.5714 111.401C68.5783 116.127 72.4114 119.959 77.1429 119.959C79.5086 119.959 81.6549 118.999 83.2046 117.447C84.7474 115.904 85.7074 113.772 85.7143 111.421C85.7143 116.154 89.5509 119.99 94.2857 119.99C96.6514 119.99 98.7977 119.03 100.347 117.481C101.897 115.932 102.857 113.786 102.857 111.421C102.857 116.154 106.694 119.99 111.429 119.99C113.794 119.99 115.941 119.03 117.49 117.481C119.04 115.932 120 113.786 120 111.421C120 109.056 119.04 106.911 117.49 105.362C115.941 103.812 113.794 102.853 111.429 102.853C113.794 102.853 115.941 101.893 117.49 100.344C119.04 98.7947 120 96.6492 120 94.2842C120 91.9193 119.04 89.7738 117.49 88.2246C115.941 86.6754 113.794 85.7158 111.429 85.7158C113.794 85.7158 115.941 84.7561 117.49 83.2069C119.04 81.6577 120 79.5122 120 77.1473C120 74.7824 119.04 72.6368 117.49 71.0876C115.941 69.5384 113.794 68.5788 111.429 68.5788C113.794 68.5788 115.941 67.6191 117.49 66.0699C119.04 64.5207 120 62.3752 120 60.0103C120 57.6454 119.04 55.4998 117.49 53.9506C115.941 52.4015 113.794 51.4418 111.429 51.4418C113.794 51.4418 115.941 50.4821 117.49 48.9329C119.04 47.3838 120 45.2382 120 42.8733C120 40.5084 119.04 38.3628 117.49 36.8137C115.941 35.2645 113.794 34.3048 111.429 34.3048C113.794 34.3048 115.941 33.3451 117.49 31.796C119.04 30.2468 120 28.1012 120 25.7363ZM102.857 102.853H85.7143V102.822H68.5714V102.832H51.4286V102.842H34.2857V102.853H17.1429V17.1678H34.2857V17.1575H51.4286V17.1473H68.5714V17.137H85.7143V17.1678H102.857V102.853Z"
    />
  </svg>
);

// "+" de la estampita "agregar" (Figma node 5564:71159, símbolo "mas") — mismo
// path en los 3 estados, solo cambia el fill.
const PlusGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M29.326 12.7273C30.0441 12.7273 30.6188 12.9649 31.0497 13.4384C31.4804 13.8781 31.6963 14.4866 31.6963 15.2643C31.3573 17.9132 31.4692 21.5911 31.636 24.3596C32.3115 24.3439 32.9888 24.3348 33.6677 24.3348C35.3913 24.3348 38.2234 23.8817 40.3644 25.046C41.4055 25.4856 42.1415 26.0093 42.5725 26.618C43.0392 27.2266 43.2726 27.8017 43.2727 28.3427C43.2727 29.0191 43.0215 29.5604 42.5188 29.9662C42.052 30.3721 41.406 30.5752 40.5802 30.5752C38.2 30.5752 34.2207 30.6285 32.1631 30.7342C32.2026 31.0625 32.2431 31.3627 32.2858 31.6342C32.3935 32.5471 32.4469 33.2741 32.4469 33.8151C32.4469 35.134 32.249 39.4835 31.8541 40.4312C31.4232 41.3782 30.9207 42.0891 30.3462 42.5626C29.7359 43.036 29.1076 43.2726 28.4613 43.2727C27.9586 43.2727 27.5273 43.1712 27.1683 42.9682C26.8092 42.7315 26.5579 42.2749 26.4143 41.5986C25.3371 38.5166 25.5167 34.1197 25.3371 32.0904C25.319 31.8827 25.3018 31.6093 25.2856 31.2833C25.2604 31.2835 25.2356 31.2853 25.2111 31.2853C21.8796 31.2853 18.8993 31.5242 15.7441 30.728C14.7387 30.3221 13.9839 29.8478 13.4812 29.3067C12.9787 28.7318 12.7273 28.1401 12.7273 27.5314C12.7273 27.0579 12.8351 26.6517 13.0505 26.3135C13.302 25.9754 13.7868 25.7386 14.5047 25.6033C16.3415 25.1979 21.8746 24.9 25.1223 24.7105C25.089 22.42 25.0708 20.2854 25.0708 19.3733C25.0709 17.7502 25.3222 16.4483 25.8248 15.4676C26.2916 14.4868 26.8485 13.7927 27.4948 13.3868C28.1411 12.9473 28.7515 12.7273 29.326 12.7273Z"
    />
  </svg>
);

// Marco liso (esquinas redondeadas, SIN festón) de la estampita "profesores" —
// Figma exporta este style ya aplanado en un solo SVG por estado (a diferencia de
// curso/agregar), pero el path del anillo y el del glifo son geométricamente
// idénticos entre default/hover/disabled — solo cambia el fill. Se separan acá en
// 2 piezas (anillo + glifo) para poder recolorear cada una por CSS.
const RoundedFrame = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M34.2857 0H25.7143H17.1429H8.57143C3.83756 0 0 3.83756 0 8.57143V17.1429V25.7143V34.2857V42.8571V51.4286V60V68.5714V77.1429V85.7143V94.2857V102.857V111.429C0 116.162 3.83756 120 8.57143 120H17.1429H25.7143H34.2857H42.8571H51.4286H60H68.5714H77.1429H85.7143H94.2857H102.857H111.429C116.162 120 120 116.162 120 111.429V102.857V94.2857V85.7143V77.1429V68.5714V60V51.4286V42.8571V34.2857V25.7143V17.1429V8.57143C120 3.83756 116.162 0 111.429 0H102.857H94.2857H85.7143H77.1429H68.5714H60H51.4286H42.8571H34.2857ZM17.1429 25.7143C17.1429 20.9804 20.9804 17.1429 25.7143 17.1429H34.2857H42.8571H51.4286H60H68.5714H77.1429H85.7143H94.2857C99.0196 17.1429 102.857 20.9804 102.857 25.7143V34.2857V42.8571V51.4286V60V68.5714V77.1429V85.7143V94.2857C102.857 99.0196 99.0196 102.857 94.2857 102.857H85.7143H77.1429H68.5714H60H51.4286H42.8571H34.2857H25.7143C20.9804 102.857 17.1429 99.0196 17.1429 94.2857V85.7143V77.1429V68.5714V60V51.4286V42.8571V34.2857V25.7143Z"
    />
  </svg>
);

// Glifo "docente" de la estampita "profesores" (Figma node 6298:4267, path
// "docente 2.1") — coordenadas ya expresadas en el mismo viewBox 0-120 del
// marco, así que se dibuja superpuesto sin cálculos extra de posición.
const DocenteGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M85 70.0103C85 71.39 84.44 72.6418 83.536 73.5457C82.632 74.4495 81.38 75.0094 80 75.0094C78.62 75.0094 77.368 75.5693 76.464 76.4732C75.56 77.377 75.004 78.6188 75 79.9906V90.0069C74.996 91.3786 74.436 92.6224 73.536 93.5223C72.632 94.4281 71.38 94.988 70 94.988C67.24 94.988 65.004 92.7524 65 89.9949C65 91.3746 64.44 92.6244 63.536 93.5302C62.632 94.4341 61.38 94.994 60 94.994C57.24 94.994 55.004 92.7584 55 90.0009C55 91.3826 54.44 92.6304 53.536 93.5362C52.632 94.4401 51.38 95 50 95C47.24 95 45.004 92.7664 45 90.0069V80.0026C44.998 78.6248 44.438 77.375 43.536 76.4732C42.632 75.5693 41.38 75.0094 40 75.0094C37.24 75.0094 35.004 72.7758 35 70.0163V70.0103C35 68.6305 35.56 67.3787 36.464 66.4749C37.368 65.571 38.62 65.0111 40 65.0111H45V65.0051H55V55.0069H45V30.0111C45 28.6294 45.56 27.3816 46.464 26.4757C47.368 25.5719 48.62 25.012 50 25.012H55V25.006H65V25H70C71.38 25 72.632 25.5599 73.536 26.4637C74.44 27.3696 75 28.6174 75 29.9991V54.9949H65V64.9931H75V65.0111H80C81.38 65.0111 82.632 65.571 83.536 66.4749C84.44 67.3787 85 68.6305 85 70.0103Z"
    />
  </svg>
);

/**
 * Estampita — Figma › "Buttons" › "Estampita" (node 7414:6271). Placa chica
 * seleccionable de 120px con 3 variantes de contenido bien distintas — cada una
 * medida 1:1 contra sus 3 estados (default/hover/disabled) en Figma:
 *
 * - `curso`: marco festoneado color naranja(default)/celeste(hover)/divider(disabled)
 *   con una caja interior mostrando una abreviatura (`nombreAbreviado`, ej. "6A").
 * - `agregar`: mismo marco festoneado pero blanco(default), con un ícono "+" adentro
 *   de una caja negra.
 * - `profesores`: marco liso (sin festón) con un ícono de docente naranja(default).
 *
 * El label debajo tiene una rareza real del archivo de Figma: en `curso` se queda
 * en Inter en los 3 estados, pero en `agregar` pasa a Shantell Sans en
 * hover/disabled (en `default` es Inter) — se replica tal cual está medido, no es
 * un error de esta implementación.
 */
export interface EstampitaProps {
  style?: 'curso' | 'agregar' | 'profesores';
  /** Solo aplica a style="curso" — abreviatura mostrada dentro del marco (ej. "6A"). */
  nombreAbreviado?: string;
  /** Texto debajo del marco. Default según `style` (igual que en Figma). */
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const DEFAULT_LABEL: Record<NonNullable<EstampitaProps['style']>, string> = {
  curso: '6to A',
  agregar: 'Añadir curso',
  profesores: 'Docentes',
};

export function Estampita({
  style = 'curso',
  nombreAbreviado = '6A',
  label,
  disabled,
  onClick,
  className,
}: EstampitaProps) {
  const resolvedLabel = label ?? DEFAULT_LABEL[style];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn('group flex w-[120px] flex-col items-center gap-4', className)}
    >
      {style === 'profesores' ? (
        <span className="relative size-[120px] shrink-0">
          <span className={cn('absolute inset-0 rounded-lg', disabled ? 'bg-darker-gray' : 'bg-black')} />
          <RoundedFrame
            className={cn('absolute inset-0 size-full', disabled ? 'text-divider' : 'text-whitesmoke group-hover:text-blue')}
          />
          <DocenteGlyph
            className={cn('absolute inset-0 size-full', disabled ? 'text-divider' : 'text-orange group-hover:text-blue')}
          />
        </span>
      ) : (
        <span
          className={cn(
            'relative size-[120px] shrink-0',
            disabled ? 'text-divider' : style === 'curso' ? 'text-orange group-hover:text-blue' : 'text-whitesmoke group-hover:text-blue',
          )}
        >
          <ScallopFrame className="absolute inset-0 size-full" />
          <span
            className={cn(
              'absolute inset-[17.22px] flex items-center justify-center overflow-hidden',
              disabled
                ? 'bg-darker-gray'
                : style === 'curso'
                  ? 'bg-whitesmoke group-hover:bg-black'
                  : 'bg-black',
            )}
          >
            {style === 'curso' ? (
              <span
                className={cn(
                  'font-shantell text-[32px] font-semibold tracking-[0.4px]',
                  disabled ? 'text-divider' : 'text-black group-hover:text-blue',
                )}
              >
                {nombreAbreviado}
              </span>
            ) : (
              <PlusGlyph className={cn('size-12', disabled ? 'text-divider' : 'text-whitesmoke')} />
            )}
          </span>
        </span>
      )}
      <span
        className={cn(
          'whitespace-nowrap text-center text-[16px] font-semibold tracking-[0.16px] underline decoration-wavy decoration-[15%]',
          'font-inter',
          style === 'agregar' && (disabled ? '!font-shantell' : 'group-hover:font-shantell'),
          disabled ? 'text-divider' : 'text-whitesmoke group-hover:text-blue',
        )}
      >
        {resolvedLabel}
      </span>
    </button>
  );
}

export default Estampita;
