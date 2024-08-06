'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface CategoriesProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	items: Category[];
}


export const Categories: React.FC<CategoriesProps> = ({
	className, items,
	...props
}) => {
	const categoryActiveId = useCategoryStore(state => state.activeId);

	return (
		<div
			className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
			{...props}
		>
			{items.map(({name, id}, index) => (
				<Link
					href={`#${name}`}
					key={index}
					className={cn(
						'flex items-center font-bold h-11 px-5 rounded-2xl',
						categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
					)}
				>
					<button>{name}</button>
				</Link>
			))}
		</div>
	);
};
