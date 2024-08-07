import { cn } from '@/lib/utils';
import React from 'react';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';

type ChooseProductFormProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	name: string;
	imageUrl: string;
	ingredients: any[];
	variants?: any[];
	onClickAdd?: VoidFunction;
};

export const ChooseProductForm: React.FC<ChooseProductFormProps> = ({
	name,
	imageUrl,
	ingredients,
	variants,
	onClickAdd,
	className,
	...props
}) => {
	const textDetails = '30 см, традиционное тесто 30'
	const totalPrice = 350;

	return <div className={cn(className, 'flex flex-1')} {...props}>
		<div className='flex items-center justify-center flex-1 relative w-full'>
			<img src={imageUrl} alt={name} className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'/>
		</div>

		<div className='w-[490px] bg-[#f7f6f5] p-7'>
			<Title text={name} size='md' className='font-extrabold mb-1'/>

			<p className='text-gray-400 mb-10'>{textDetails}</p>

			<Button className='h-[55px] px-10 text-base rounded-[18px] w-full'>
				Добавить в корзину за {totalPrice} ₽
			</Button>
		</div>
	</div>;
};