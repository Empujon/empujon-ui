import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Componentes/Footer',
  component: Footer,
  args: {
    fixed: false,
    links: [
      { label: 'Investigación', href: '#' },
      { label: 'Centro de ayuda', href: '#' },
      { label: 'Equipo', href: '#' },
      { label: 'Privacidad', href: '#' },
    ],
  },
};
export default meta;
type Story = StoryObj<typeof Footer>;

export const Landing: Story = {};
