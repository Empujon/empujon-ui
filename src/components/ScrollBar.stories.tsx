import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScrollBar } from './ScrollBar';
import { cn } from '../lib/cn';

const meta: Meta<typeof ScrollBar> = { title: 'Componentes/ScrollBar', component: ScrollBar };
export default meta;
type Story = StoryObj<typeof ScrollBar>;

const paragraph1 =
  'La lectura frecuente construye vocabulario, mejora la comprensión de textos complejos y ayuda a sostener la ' +
  'atención durante períodos más largos. Cuando alguien lee todos los días, aunque sea por poco tiempo, empieza a ' +
  'reconocer patrones en la forma en que se organizan las ideas: cómo se presenta un argumento, cómo se conecta ' +
  'un párrafo con el siguiente y qué información conviene retener para seguir el hilo. Este hábito no depende del ' +
  'género que se elija — funciona igual con una novela, un artículo o un informe técnico — sino de la constancia ' +
  'con la que se practica día a día.';

const paragraph2 =
  'Además de los beneficios cognitivos, leer con regularidad tiene un efecto directo sobre la velocidad de ' +
  'procesamiento del lenguaje escrito. A medida que el cerebro se familiariza con estructuras gramaticales y ' +
  'combinaciones de palabras frecuentes, necesita menos esfuerzo consciente para decodificar cada oración, lo que ' +
  'libera recursos para pensar en el contenido en sí mismo. Por eso quienes leen más también tienden a escribir ' +
  'con mayor claridad, porque reconocen casi de forma intuitiva qué frases funcionan y cuáles resultan confusas ' +
  'para quien las recibe.';

function DemoContent() {
  return (
    <>
      <h1 className="font-shantell font-bold text-h1 text-whitesmoke mb-4">Este es un título de ejemplo</h1>
      <p className="font-inter text-texto-chico text-whitesmoke">{paragraph1}</p>
      <h2 className="font-shantell font-semibold text-h2 text-whitesmoke mt-10 mb-4">Este es un título de ejemplo</h2>
      <p className="font-inter text-texto-chico text-whitesmoke">{paragraph2}</p>
    </>
  );
}

/**
 * `orientation` queda funcional como Control: el contenido de ejemplo se adapta según
 * el eje elegido (ancho fijo + espacio abajo para horizontal; ancho natural + espacio
 * a la derecha para vertical), en vez de quedar atado a un único layout que solo
 * desborda en un sentido.
 *
 * El padding vive en el contenido, no en `ScrollBar`: así la barra queda pegada a los
 * bordes del contenedor (como en el Figma) mientras el texto mantiene su margen.
 */
function ScrollBarDemo({ orientation }: { orientation: 'horizontal' | 'vertical' }) {
  const isHorizontal = orientation === 'horizontal';
  return (
    <div className="bg-black w-full max-w-[600px]" style={{ height: 380 }}>
      <ScrollBar orientation={orientation} className="h-full">
        <div
          className={cn('p-8', isHorizontal ? 'pb-10' : 'pr-10')}
          style={isHorizontal ? { width: 1400 } : undefined}
        >
          <DemoContent />
        </div>
      </ScrollBar>
    </div>
  );
}

export const Barra: Story = {
  name: 'Barra',
  args: { orientation: 'vertical' },
  render: (args) => <ScrollBarDemo orientation={args.orientation === 'horizontal' ? 'horizontal' : 'vertical'} />,
};
