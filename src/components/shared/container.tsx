import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
	return (
		<div className={cn('mx-auto max-w-[1380px] px-[66px]', className)} {...props}>{children}</div>
	)
}
