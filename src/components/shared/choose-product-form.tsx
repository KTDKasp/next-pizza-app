'use client'

import { cn } from '@/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';

type ChooseProductFormProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	name: string;
	imageUrl: string;
	price: number;
	onClickAddToCart?: VoidFunction;
};

/**
 * 	Форма выбора продукта
 */
export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
	name,
	imageUrl,
	price,
	onClickAddToCart,
	className,
	...props
}) => {

	return <div className={cn(className, 'flex flex-1')} {...props}>
		<div className='flex items-center justify-center flex-1 relative w-full'>
			<img src={imageUrl} alt={name} className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'/>
		</div>

		<div className='w-[490px] bg-[#f7f6f5] p-7'>
			<Title text={name} size='md' className='font-extrabold mb-5'/>

			<Button onClick={onClickAddToCart} className='h-[55px] px-10 text-base rounded-[18px] w-full'>
				Добавить в корзину за {price} ₽
			</Button>
		</div>
	</div>;
};
