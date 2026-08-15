'use client';

import React, { useState } from 'react';
import { cn } from '../lib/cn';
import { IconSend } from './designerIcons';

/**
 * Chat — primitivas de burbuja + input de chat (Figma › "Chatama" › Bubble/Input Bar).
 * Gap 100% nuevo como PIEZAS DE SISTEMA. Chatama en sí (la mascota, el sidebar
 * compacto/overlay, el markdown, los attachments) ya está muy bien construido en
 * `empujon/frontend` (`BotBubble`, `UserBubble`, `ChatbotSidebar`, `BotSquare`,
 * `TypingDots`) — es producto, no design system, y no se tocó. Estas son las
 * burbujas/input genéricos por si otra app necesita un chat simple sin todo ese armado.
 */
export interface ChatBubbleProps {
  from: 'bot' | 'user';
  children: React.ReactNode;
  className?: string;
}

export function ChatBubble({ from, children, className }: ChatBubbleProps) {
  const isBot = from === 'bot';
  return (
    <div
      className={cn(
        'max-w-[368px] rounded-[24px] px-4 py-3 font-inter text-[16px]',
        isBot ? 'self-start bg-lightgray text-black' : 'self-end bg-darker-gray text-whitesmoke',
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface ChatInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function ChatInputBar({ value, onChange, onSend, placeholder = 'Escribí tu mensaje...', disabled, className }: ChatInputBarProps) {
  const submit = () => {
    if (value.trim() && !disabled) onSend();
  };
  return (
    <div className={cn('flex w-full items-end gap-2 rounded-[24px] bg-darker-gray p-2', className)}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        className="flex-1 resize-none bg-transparent px-2 py-2 font-inter text-[16px] text-whitesmoke outline-none placeholder:text-lightgray"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label="Enviar"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange text-black disabled:opacity-40"
      >
        <IconSend className="size-5" />
      </button>
    </div>
  );
}

export default ChatBubble;
