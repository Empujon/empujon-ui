import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Componentes/Footer',
  component: Footer,
  args: {
    fixed: false,
    links: [
      { label: 'Términos', href: '#' },
      { label: 'Privacidad', href: '#' },
      { label: 'Contacto', href: '#' },
    ],
  },
};
export default meta;
type Story = StoryObj<typeof Footer>;

export const Playground: Story = {};
