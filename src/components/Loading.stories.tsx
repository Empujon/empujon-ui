import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { DotsLoader, ProgressDots } from './Loading';
import { LoadingSpinner as LoadingSpinnerMandala } from './LoadingSpinner';

const meta: Meta<typeof ProgressDots> = { title: 'Componentes/Loading', component: ProgressDots };
export default meta;
type Story = StoryObj<typeof ProgressDots>;

export const Spinners: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Spinner key={s} size={s} />
      ))}
      <Spinner color="green" />
    </div>
  ),
};

export const Dots: Story = {
  render: () => (
    <div className="flex gap-8">
      <DotsLoader color="green" />
      <DotsLoader color="orange" size="lg" count={4} />
    </div>
  ),
};

export const Progreso: Story = {
  render: () => {
    // Loop 0 → 100: llena de a un punto, hace una pausa al llegar a 100% y reinicia.
    const [value, setValue] = useState(0);

    useEffect(() => {
      let holding = false;
      const id = setInterval(() => {
        setValue((v) => {
          if (holding) {
            holding = false;
            return 0;
          }
          if (v >= 100) {
            holding = true;
            return 100;
          }
          return v + 10;
        });
      }, 400);
      return () => clearInterval(id);
    }, []);

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Green</span>
          <ProgressDots value={value} showLabel />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-inter text-xs text-white/60">Orange</span>
          <ProgressDots value={value} color="orange" showLabel />
        </div>
      </div>
    );
  },
};

export const LoadingSpinner: Story = {
  render: () => <LoadingSpinnerMandala />,
};
