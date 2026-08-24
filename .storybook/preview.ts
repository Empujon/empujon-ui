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
    options: {
      storySort: (a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }),
    },
  },
};

export default preview;
