import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';
import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';

type CartDrawerItemProps = React.DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> &
	CartItemProps & {};

export const CartDrawerItem: React.FC<CartDrawerItemProps> = ({
	id,
	imageUrl,
	name,
	price,
	quantity,
	details,
	className,
	...props
}) => {
	return (
		<div className={cn('flex bg-white p-5 gap-6', className)} {...props}>
			<CartItem.Image src={imageUrl} />

			<div className="flex-1">
				<CartItem.Info name={name} details={details} />

				<hr className="my-3" />

				<div className="flex items-center justify-between">
					<CountButton onClickCountButton={(type) => console.log(type)} value={quantity} />

					<div>
						<CartItem.Price value={price} />
						<Trash2Icon className="text-gray-400 hover:text-gray-600 cursor-pointer" size={16} />
					</div>
				</div>
			</div>
		</div>
	);
};
