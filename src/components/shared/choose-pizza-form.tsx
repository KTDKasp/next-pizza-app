import { cn } from '@/lib/utils';
import React from 'react';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';

type ChoosePizzaFormProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	name: string;
	imageUrl: string;
	ingredients: any[];
	variants?: any[];
	onClickAdd?: VoidFunction;
};

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
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
	const size = 30;

	return <div className={cn(className, 'flex flex-1')} {...props}>
		<ProductImage imageUrl={imageUrl} size={size} />

		<div className='w-[490px] bg-[#f7f6f5] p-7'>
			<Title text={name} size='md' className='font-extrabold mb-1'/>

			<p className='text-gray-400 mb-10'>{textDetails}</p>

			<Button className='h-[55px] px-10 text-base rounded-[18px] w-full'>
				Добавить в корзину за {totalPrice} ₽
			</Button>
		</div>
	</div>;
};
