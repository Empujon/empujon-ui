'use client';

// Modal — shell de modal reutilizable con header sticky / contenido scrolleable
// / actions sticky. Portado 1:1 desde empujón (design system).
//
// Spec:
//   - Ancho por defecto 672px. 32px de gutter a los bordes del viewport.
//   - Tres regiones: header (sticky) · content (scrollea al desbordar) · actions (sticky).
//
// Uso:
//   <Modal onClose={...} title="..." subtitle="...">
//     <Modal.Content>...campos...</Modal.Content>
//     <Modal.Actions>
//       <Button variant="secondary-dark">Cancelar</Button>
//       <Button>Guardar</Button>
//     </Modal.Actions>
//   </Modal>

import React from 'react';
import { cn } from '../lib/cn';

export interface ModalProps {
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Reemplaza el header título/subtítulo/X por completo. */
  headerSlot?: React.ReactNode;
  /** Oculta el botón X. */
  hideClose?: boolean;
  /** Override del max-width (px) por defecto (672). */
  maxWidth?: number;
  /** Deshabilita el botón de cierre (ej. mientras se envía). */
  closeDisabled?: boolean;
  children: React.ReactNode;
  /** Clases extra en el overlay externo (ej. z-index mayor). */
  overlayClassName?: string;
  /** Clases extra en la card interna. */
  cardClassName?: string;
}

interface SlotProps {
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> & {
  Content: React.FC<SlotProps>;
  Actions: React.FC<SlotProps>;
} = ({
  onClose,
  title,
  subtitle,
  headerSlot,
  hideClose = false,
  maxWidth = 672,
  closeDisabled = false,
  children,
  overlayClassName,
  cardClassName,
}) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60 p-8',
        overlayClassName,
      )}
    >
      {/* Borde gradiente (3px) */}
      <div
        className="rounded-[24px] p-[3px] w-full bg-divider"
        style={{ maxWidth: `${maxWidth}px` }}
      >
        <div
          style={{ maxHeight: 'calc(100vh - 70px)' }}
          className={cn(
            'bg-darker-gray rounded-[22px] w-full flex flex-col min-h-0 overflow-hidden',
            cardClassName,
          )}
        >
          {(headerSlot || title || !hideClose) && (
            <div className="flex items-start gap-4 p-6 md:p-8 pb-4 md:pb-5 flex-shrink-0">
              {headerSlot ? (
                <div className="flex-1 min-w-0">{headerSlot}</div>
              ) : (
                <div className="flex-1 min-w-0">
                  {title && (
                    <h2 className="font-shantell text-white text-2xl font-semibold">{title}</h2>
                  )}
                  {subtitle && (
                    <p className="font-inter font-bold text-white text-base mt-1">{subtitle}</p>
                  )}
                </div>
              )}
              {!hideClose && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar"
                  className="flex-shrink-0 -mt-1 -mr-1 p-1 text-white hover:text-blue transition-colors disabled:opacity-50 disabled:hover:text-white"
                  disabled={closeDisabled}
                >
                  <svg width="28" height="28" viewBox="0 0 44 44" fill="none" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M12.4929 35C11.8737 35 11.3523 34.8362 10.9287 34.5085C10.5377 34.1808 10.2933 33.673 10.1955 32.9849C10.1303 32.2968 10.277 31.4285 10.6354 30.38C11.0265 29.2004 11.6782 27.8242 12.5906 26.2514C13.5031 24.6786 14.6273 23.0239 15.9633 21.2873C17.2994 19.518 18.8147 17.7813 20.5092 16.0775C22.2037 14.3737 24.0285 12.8173 25.9837 11.4083C26.7984 10.7858 27.5153 10.3106 28.1344 9.98299C28.7862 9.62256 29.3564 9.37681 29.8452 9.24575C30.3666 9.08192 30.8391 9 31.2627 9C32.0122 9 32.6477 9.26213 33.169 9.78639C33.723 10.3106 34 11.0807 34 12.0964C34 12.7845 33.8208 13.3743 33.4623 13.8658C33.1039 14.3245 32.6151 14.7505 31.9959 15.1437C29.78 16.4543 27.7108 18.0435 25.7882 19.9112C23.8982 21.7461 22.1385 23.7448 20.5092 25.9074C18.9124 28.0699 17.4297 30.2817 16.0611 32.5425C15.5071 33.4272 14.9369 34.0498 14.3503 34.4102C13.7637 34.8034 13.1446 35 12.4929 35ZM31.2627 34.9509C30.5458 34.9509 29.8778 34.7706 29.2587 34.4102C28.6721 34.0498 28.0367 33.3617 27.3523 32.3459C26.4073 30.9698 25.332 29.528 24.1263 28.0208C22.9206 26.4808 21.6497 24.9735 20.3136 23.4991C18.9776 21.9918 17.6415 20.5829 16.3055 19.2722C14.9695 17.9616 13.7312 16.8311 12.5906 15.8809C11.776 15.2256 11.1405 14.6194 10.6843 14.0624C10.2281 13.5054 10 12.8009 10 11.949C10 11.1298 10.2118 10.4417 10.6354 9.88469C11.0591 9.32766 11.6945 9.04915 12.5418 9.04915C13.1935 9.04915 13.7963 9.1966 14.3503 9.49149C14.9369 9.78639 15.7026 10.3434 16.6477 11.1626C17.332 11.7196 18.1792 12.506 19.1894 13.5217C20.2322 14.5375 21.3401 15.6843 22.5132 16.9622C23.6864 18.2401 24.8432 19.5507 25.9837 20.8941C27.1568 22.2048 28.2322 23.4663 29.2098 24.6786C30.22 25.8582 31.0346 26.8904 31.6538 27.775C32.6314 29.1512 33.2505 30.2161 33.5112 30.9698C33.8045 31.6906 33.9511 32.2804 33.9511 32.7391C33.9511 33.4272 33.7067 33.9679 33.2179 34.3611C32.7291 34.7543 32.0774 34.9509 31.2627 34.9509Z"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

/** Región de contenido scrolleable. Dueña del único overflow del modal.
 *
 *  Nota: algunos consumidores (empujón) ocultan globalmente el scrollbar de
 *  elementos anidados con `*::-webkit-scrollbar { display: none }`. Forzamos
 *  aquí el `::-webkit-scrollbar` base a mostrarse para que la barra estilizada
 *  del plugin `tailwind-scrollbar` sea visible pese a esa regla global. */
const ModalContent: React.FC<SlotProps> = ({ children, className }) => (
  <div
    className={cn(
      'flex-1 min-h-0 overflow-y-auto mx-5 pt-3 pb-5 pr-2 flex flex-col gap-5',
      'scrollbar scrollbar-thin scrollbar-thumb-white scrollbar-track-[#879187]',
      'scrollbar-thumb-rounded-full scrollbar-track-rounded-full',
      '[&::-webkit-scrollbar]:!block [&::-webkit-scrollbar]:!w-2',
      className,
    )}
  >
    {children}
  </div>
);

/** Fila de acciones sticky al fondo de la card. */
const ModalActions: React.FC<SlotProps> = ({ children, className }) => (
  <div className={cn('flex-shrink-0 px-6 md:px-8 py-4 md:py-5 flex justify-end gap-3', className)}>
    {children}
  </div>
);

Modal.Content = ModalContent;
Modal.Actions = ModalActions;

export { Modal };
export default Modal;
