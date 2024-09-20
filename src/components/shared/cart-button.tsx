'use client'

import React from 'react';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/store/cart';

type CartButtonProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> & {};

export const CartButton: React.FC<CartButtonProps> = ({
	className,
	...props
}) => {
	const [totalAmount, items, loading] = useCartStore((state) => [state.totalAmount, state.items, state.loading])
	return (
		<CartDrawer>
			<Button loading={loading} className={cn('group relative', { 'w-[105px]': loading }, className)} {...props}>
				<b>{totalAmount} ₽</b>
				<span className="h-full w-[1px] bg-white/30 mx-3" />
				<div className="flex items-center gap-2 transition duration-300 group-hover:opacity-0">
					<ShoppingCart className="w-4 h-4 relative" strokeWidth={2} />
					<b>{items.length}</b>
				</div>
				<ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
			</Button>
		</CartDrawer>
	);
};
