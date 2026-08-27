import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from './Card';
import { Button } from './Button';
import { StatusLabel } from './StatusLabel';

const meta: Meta<typeof Card> = { title: 'Componentes/Card', component: Card };
export default meta;
type Story = StoryObj<typeof Card>;

export const Completa: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Card dark</CardTitle>
        <StatusLabel variant="success">activo</StatusLabel>
      </CardHeader>
      <CardBody className="text-white/80">
        Contenedor estándar (radius 24, padding md) con slots header / body / footer.
      </CardBody>
      <CardFooter>
        <Button size="sm">Acción</Button>
        <Button size="sm" variant="ghost">Cancelar</Button>
      </CardFooter>
    </Card>
  ),
};

export const Superficies: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card surface="dark"><CardTitle>dark</CardTitle></Card>
      <Card surface="black"><CardTitle>black</CardTitle></Card>
      <Card surface="outline"><CardTitle>outline</CardTitle></Card>
      <Card surface="light"><CardTitle>light</CardTitle></Card>
    </div>
  ),
};
