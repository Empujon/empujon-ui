import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from './Card';
import { Button } from './Button';
import { StatusLabel } from './StatusLabel';

const meta: Meta<typeof Card> = { title: 'Componentes/Cards', component: Card };
export default meta;
type Story = StoryObj<typeof Card>;

// Fiel a "Plain card" (Figma archivo "MESA DE TRABAJO", node 9273:18356):
// header (título+subtítulo / status) + descripción de hasta 2 líneas +
// acciones alineadas a la derecha (secundaria + primaria).
export const Plain: Story = {
  render: () => (
    <Card padding="sm" className="w-full max-w-sm">
      <CardHeader>
        <div className="flex flex-col gap-0.5">
          <CardTitle>Título</CardTitle>
          <p className="font-inter text-sm text-white/80">Subtítulo</p>
        </div>
        <StatusLabel>Status</StatusLabel>
      </CardHeader>
      <CardBody>Esta es la descripción de la tarjeta. Puede tener como máximo dos líneas de texto.</CardBody>
      <CardFooter>
        <Button variant="secondary-dark" size="sm">
          Acción 2
        </Button>
        <Button variant="primary-dark" size="sm">
          Acción 1
        </Button>
      </CardFooter>
    </Card>
  ),
};
