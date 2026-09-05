'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../lib/cn';

/**
 * ScrollBar — contenedor con thumb/track propios, siempre visibles.
 *
 * v1 estilaba el scrollbar NATIVO (`::-webkit-scrollbar`), como hace Obelisco. Eso
 * cambia color/forma, pero el show/hide (aparece recién al hacer scroll o hover) lo
 * decide el sistema operativo — en Safari ese fade-in/out no se puede overridear
 * desde CSS por más que se estilen los pseudo-elementos. La única forma confiable de
 * que quede siempre visible en todos los navegadores es dejar de depender del
 * scrollbar nativo: se lo esconde (`scrollbar-width:none` +
 * `::-webkit-scrollbar{display:none}`) y se dibuja un thumb propio, sincronizado con
 * el scroll real vía `onScroll`/`ResizeObserver` y arrastrable con Pointer Events.
 */
export type ScrollBarProps = {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children: React.ReactNode;
};

const MIN_THUMB_LENGTH = 24; // px — no dejarlo tan chico que no se pueda agarrar

export function ScrollBar({ orientation = 'vertical', className, children }: ScrollBarProps) {
  const isHorizontal = orientation === 'horizontal';
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startPointer: number; startScroll: number } | null>(null);
  const [thumb, setThumb] = useState({ length: 0, offset: 0, visible: false });

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollSize = isHorizontal ? el.scrollWidth : el.scrollHeight;
    const clientSize = isHorizontal ? el.clientWidth : el.clientHeight;
    if (scrollSize <= clientSize) {
      setThumb({ length: 0, offset: 0, visible: false });
      return;
    }
    const scrollPos = isHorizontal ? el.scrollLeft : el.scrollTop;
    const length = Math.max((clientSize / scrollSize) * clientSize, MIN_THUMB_LENGTH);
    const maxOffset = clientSize - length;
    const offset = (scrollPos / (scrollSize - clientSize)) * maxOffset;
    setThumb({ length, offset, visible: true });
  }, [isHorizontal]);

  useEffect(() => {
    update();
    const el = scrollRef.current;
    const content = contentRef.current;
    if (!el || !content) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    ro.observe(content);
    return () => ro.disconnect();
  }, [update]);

  const onThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      startPointer: isHorizontal ? e.clientX : e.clientY,
      startScroll: isHorizontal ? el.scrollLeft : el.scrollTop,
    };
  };

  const onThumbPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !dragRef.current) return;
    const scrollSize = isHorizontal ? el.scrollWidth : el.scrollHeight;
    const clientSize = isHorizontal ? el.clientWidth : el.clientHeight;
    const delta = (isHorizontal ? e.clientX : e.clientY) - dragRef.current.startPointer;
    const ratio = scrollSize / clientSize;
    const nextScroll = dragRef.current.startScroll + delta * ratio;
    if (isHorizontal) el.scrollLeft = nextScroll;
    else el.scrollTop = nextScroll;
  };

  const onThumbPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div className={cn('relative', className)}>
      <div
        ref={scrollRef}
        tabIndex={0}
        onScroll={update}
        className={cn(
          'h-full w-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          isHorizontal ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto overflow-x-hidden',
        )}
      >
        <div ref={contentRef}>{children}</div>
      </div>
      {thumb.visible && (
        <div
          aria-hidden
          className={cn(
            'absolute rounded-pill bg-divider pointer-events-none',
            isHorizontal ? 'inset-x-0 bottom-1 h-4' : 'inset-y-0 right-1 w-4',
          )}
        >
          <div
            onPointerDown={onThumbPointerDown}
            onPointerMove={onThumbPointerMove}
            onPointerUp={onThumbPointerUp}
            className={cn(
              'absolute rounded-pill bg-whitesmoke cursor-pointer pointer-events-auto',
              isHorizontal ? 'inset-y-0' : 'inset-x-0',
            )}
            style={
              isHorizontal
                ? { left: thumb.offset, width: thumb.length }
                : { top: thumb.offset, height: thumb.length }
            }
          />
        </div>
      )}
    </div>
  );
}

export default ScrollBar;
