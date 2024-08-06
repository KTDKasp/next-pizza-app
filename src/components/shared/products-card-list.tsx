'use client';

import React from 'react'
import { Title } from './title';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@siberiacancode/reactuse';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store/category';

interface ProductsCardListProps {
	title: string;
	productItems: any[];
	categoryId: number;
	className?: string;
	listClassName?: string;
}

export const ProductsCardList: React.FC<ProductsCardListProps> = ({
	title,
	productItems,
	categoryId,
	className,
	listClassName
}) => {
	const setActiveCategoryId = useCategoryStore(state => state.setActiveId);
	const intersectionRef = React.useRef<HTMLDivElement>(null);
	const intersectionObserver = useIntersectionObserver<HTMLDivElement>({
		root: intersectionRef,
		threshold: 0.4,
	})

	React.useEffect(() => {
		if (intersectionObserver?.inView) {
			setActiveCategoryId(categoryId)
		}
	}, [categoryId, title, intersectionObserver.inView])

	return (
		<div className={className} id={title} ref={intersectionObserver.ref}>
			<Title text={title} size='lg' className='font-extrabold mb-5'/>

			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{productItems.map((product, i) => (
					<ProductCard 
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.variants[0].price}
					/>
				))}
			</div>
		</div>
	)
}