import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import React, { HTMLAttributes } from 'react';

type IngredientCardProps = React.DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	name: string;
	price: number;
	imageUrl: string;
	active?: boolean;
	onClickIngredient?: () => void;
};

export const IngredientCard: React.FC<IngredientCardProps> = ({
	name,
	price,
	imageUrl,
	active,
	onClickIngredient,
	className,
	...props
}) => {
	return (
		<div
			className={cn(
				'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer bg-white shadow-md',
				{ 'border border-primary': active },
				className
			)}
			onClick={onClickIngredient}
			{...props}
		>
			{ active && <CircleCheck className='absolute top-[10px] right-[10px] text-primary' /> }
			<img src={imageUrl} alt={name} width={110} height={110} />
			<span className='text-xs mb-1'>{name}</span>
			<span className='font-bold'>{price} ₽</span>
		</div>
	);
};
