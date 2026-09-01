import type { Meta, StoryObj } from '@storybook/react';
import { FotoflashCard } from './FotoflashCard';

const meta: Meta<typeof FotoflashCard> = {
  title: 'Componentes/Cards',
  component: FotoflashCard,
};
export default meta;
type Story = StoryObj<typeof FotoflashCard>;

// `word` (correct/incorrect) como columnas, con label. Clickeá una card para
// ver el estado "Active" persistente (verde/magenta según `word`) — Hover es
// interacción real, pasá el mouse. Achicá el canvas para ver cómo cada card
// se ajusta al ancho disponible manteniendo la proporción.
// Sin padding propio acá: el preview de Storybook ya trae 16px de padding en
// el body por default, que es el único margen que queremos mostrar (el de la
// grilla de la página) — agregar otro acá lo duplicaba a 32px.
export const Fotoflash: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 bg-black">
      <div className="flex w-full max-w-[464px] flex-col gap-3">
        <span className="font-inter text-sm text-lightgray">Correct</span>
        <FotoflashCard text="intangente" word="correct" onClick={() => {}} />
      </div>
      <div className="flex w-full max-w-[464px] flex-col gap-3">
        <span className="font-inter text-sm text-lightgray">Incorrect</span>
        <FotoflashCard text="palabra" word="incorrect" onClick={() => {}} />
      </div>
    </div>
  ),
};
