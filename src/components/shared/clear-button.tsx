import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React from 'react';

type ClearButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClickClearButton?: VoidFunction;
};

export const ClearButton: React.FC<ClearButtonProps> = ({
  onClickClearButton,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClickClearButton}
      className={cn(
        'absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer',
        className
      )}
    >
      <X className='h-5 w-5' />
    </button>
  );
};
