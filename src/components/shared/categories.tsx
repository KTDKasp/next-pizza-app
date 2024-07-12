import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface CategoriesProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {}

const categories = [
	'Пиццы',
	'Комбо',
	'Закуски',
	'Напитки',
	'Десерты',
	'Кофе',
	'Коктейли',
];
const activeIndex = 0;

export const Categories: React.FC<CategoriesProps> = ({
	className,
	...props
}) => {
	return (
		<div
			className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
			{...props}
		>
			{categories.map((category, index) => (
				<Link
					href={'#'}
					key={index}
					className={cn(
						'flex items-center font-bold h-11 px-5 rounded-2xl',
						activeIndex === index && 'bg-white shadow-md shadow-gray-200 text-primary'
					)}
				>
					<button>{category}</button>
				</Link>
			))}
		</div>
	);
};
