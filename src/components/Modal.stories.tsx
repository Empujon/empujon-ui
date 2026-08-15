import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from './Button';

const meta: Meta<typeof Modal> = { title: 'Componentes/Modal', component: Modal };
export default meta;
type Story = StoryObj<typeof Modal>;

export const Playground: Story = {
  render: () => (
    <Modal onClose={() => {}} title="Editar datos del estudiante" subtitle="1 Escakas (Empujón School)">
      <Modal.Content>
        <p className="font-inter text-white">Contenido del formulario.</p>
      </Modal.Content>
      <Modal.Actions>
        <Button variant="secondary-dark">Cancelar</Button>
        <Button>Guardar</Button>
      </Modal.Actions>
    </Modal>
  ),
};
