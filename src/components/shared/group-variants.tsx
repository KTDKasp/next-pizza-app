'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type Variant = {
	name: string;
	value: string;
	disabled?: boolean;
};

type GroupVariantsProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	items: readonly Variant[];
	selectedValue?: Variant['value'];
	onClickVariant?: (value: Variant['value']) => void;
};

export const GroupVariants: React.FC<GroupVariantsProps> = ({
	items,
	selectedValue,
	onClickVariant,
	className,
	...props
}) => {

	return (
		<div
			{...props}
			className={cn(
				className,
				'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none'
			)}
		>
			{items.map((item) => (
				<button
					key={item.name}
					onClick={() => onClickVariant?.(item.value)}
					className={cn(
						'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
						{
							'bg-white shadow': item.value === selectedValue,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled,
						}
					)}
				>
					{item.name}
				</button>
			))}
		</div>
	);
};
