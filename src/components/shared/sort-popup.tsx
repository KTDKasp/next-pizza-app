import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';

interface SortPopupProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {}

export const SortPopup: React.FC<SortPopupProps> = ({
	className,
	...props
}) => {
	return (
		<div
			className={cn(
				'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
				className
			)}
			{...props}
		>
			<ArrowUpDown size={16} />
			<b>Сортировка:</b>
			<b className='text-primary'>популярное</b>
		</div>
	);
};
