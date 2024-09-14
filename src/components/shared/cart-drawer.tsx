'use client';

import React from 'react';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { useCartStore } from '@/store/cart';
import { getCartItemDetails } from '@/lib';
import { PizzaSize, PizzaType } from '@/constants/pizza';

type CartDrawerProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {};

export const CartDrawer: React.FC<CartDrawerProps> = ({
	children,
	className,
	...props
}) => {
	const [
		totalAmount,
		items,
		fetchCartItems,
		updateItemQuantity,
		removeCartItem,
	] = useCartStore((state) => [
		state.totalAmount,
		state.items,
		state.fetchCartItems,
		state.updateItemQuantity,
		state.removeCartItem,
	]);

	React.useEffect(() => {
		fetchCartItems();
	}, [fetchCartItems]);

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const updatedQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

		updateItemQuantity(id, updatedQuantity);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
				<SheetHeader>
					<SheetTitle>
						В корзине <span className="font-bold">{items.length} товара</span>
					</SheetTitle>
					<SheetDescription>
						<VisuallyHidden.Root>desc</VisuallyHidden.Root>
					</SheetDescription>
				</SheetHeader>

				<div className="-mx-6 mt-5 overflow-auto flex-1">
					{items.map((item) => (
						<div key={item.id} className="mb-2">
							<CartDrawerItem
								id={item.id}
								imageUrl={item.imageUrl}
								name={item.name}
								price={item.price}
								quantity={item.quantity}
								details={
									item.pizzaType && item.pizzaSize
										? getCartItemDetails(
												item.pizzaType as PizzaType,
												item.pizzaSize as PizzaSize,
												item.ingredients
										  )
										: ''
								}
								onClickCountButton={(type) =>
									onClickCountButton(item.id, item.quantity, type)
								}
								onClickRemoveButton={() => removeCartItem(item.id)}
							/>
						</div>
					))}
				</div>

				<SheetFooter className="-mx-6 bg-white p-8">
					<div className="w-full">
						<div className="flex mb-4">
							<span className="flex flex-1 text-lg text-neutral-500">
								Итого
								<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
							</span>
							<span className="text-lg font-bold">{totalAmount} ₽</span>
						</div>

						<Link href="/cart">
							<Button type="submit" className="w-full h-12 text-base">
								Оформить заказ
								<ArrowRight className="w-5 ml-2" />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
