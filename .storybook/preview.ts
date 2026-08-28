import type { Preview } from '@storybook/react';
import './tailwind.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'empujón',
      values: [
        { name: 'empujón', value: '#171D17' },
        { name: 'claro', value: '#F4F5F5' },
      ],
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    // Sin esto, el sidebar ordena por el orden en que Storybook descubre los
    // archivos *.stories.tsx (alfabético por NOMBRE DE ARCHIVO, no por título) —
    // un componente con varios archivos de stories (ej. Tooltip.stories.tsx +
    // InformativeTooltip.stories.tsx) queda agrupado donde cae el primero de
    // esos archivos, no donde correspondería alfabéticamente por su título.
    //
    // La carpeta "Componentes/Button" junta 7 archivos de stories (uno por tipo
    // de botón de Figma) — sin un orden explícito quedarían en orden alfabético
    // de archivo, no en el orden en que Figma/el equipo los piensa.
    options: {
      storySort: (a, b) => {
        if (a.title === 'Componentes/Button' && b.title === 'Componentes/Button') {
          const order = [
            'Basic button',
            'Card action button',
            'Estampita',
            'Illustration button',
            'Square button',
            'Round button',
            'Icon Button',
          ];
          return order.indexOf(a.name) - order.indexOf(b.name);
        }
        return a.title.localeCompare(b.title, undefined, { numeric: true });
      },
    },
  },
};

export default preview;
