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
  },
};

export default preview;
