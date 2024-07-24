'use client';

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import Link from 'next/link';
import React from 'react';

interface CategoriesProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {}

const categories = [
	{ id: 1, name: 'Пиццы' },
	{ id: 2, name: 'Комбо' },
	{ id: 3, name: 'Закуски' },
	{ id: 4, name: 'Напитки' },
	{ id: 5, name: 'Десерты' },
	{ id: 6, name: 'Кофе' },
	{ id: 7, name: 'Коктейли' },
];

export const Categories: React.FC<CategoriesProps> = ({
	className,
	...props
}) => {
	const categoryActiveId = useCategoryStore(state => state.activeId);

	return (
		<div
			className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
			{...props}
		>
			{categories.map(({name, id}, index) => (
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
