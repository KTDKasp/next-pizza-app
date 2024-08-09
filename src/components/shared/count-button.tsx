import React from 'react';
import { cn } from '@/lib/utils';
import { CountIconButton } from './count-icon-button';

export interface CountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  className?: string;
  onClickCountButton?: (type: 'plus' | 'minus') => void;
}

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  onClickCountButton,
  value = 1,
  size = 'sm',
}) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        onClickIconButton={() => onClickCountButton?.('minus')}
        disabled={value === 1}
        size={size}
        type="minus"
      />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

      <CountIconButton onClickIconButton={() => onClickCountButton?.('plus')} size={size} type="plus" />
    </div>
  );
};
