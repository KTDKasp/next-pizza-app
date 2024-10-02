import { cn } from '@/lib/utils';
import React from 'react'

type ErrorTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  text: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ text, className }) => {
  return (
    <p className={cn("text-red-500 text-sm", className)}>{text}</p>
  )
};
