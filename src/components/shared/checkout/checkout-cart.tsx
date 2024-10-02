import React from 'react'
import { WhiteBlock } from '../white-block'
import { CartStateItem } from '@/lib/get-cart-details'
import { updateQuantityOnClick } from '@/lib/update-quantity-onclick';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { getCartItemDetails } from '@/lib';
import { CheckoutItem } from '../checkout-item';

type CheckoutCartProps = React.HTMLAttributes<HTMLDivElement> & {
  items: CartStateItem[];
  removeCartItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
}

export const CheckoutCart: React.FC<CheckoutCartProps> = ({ removeCartItem, items, updateItemQuantity, className, ...props}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
						<div className="flex flex-col gap-5">
							{items.map((item) => (
								<CheckoutItem
									key={item.id}
									id={item.id}
									name={item.name}
									price={item.price}
									imageUrl={item.imageUrl}
									quantity={item.quantity}
									details={getCartItemDetails(
										item.ingredients,
										item.pizzaType as PizzaType,
										item.pizzaSize as PizzaSize
									)}
									disabled={item.disabled}
									onClickRemoveButton={() => removeCartItem(item.id)}
									onClickCountButton={(type) =>
										updateItemQuantity(
											item.id,
											updateQuantityOnClick(item.quantity, type)
										)
									}
								/>
							))}
						</div>
					</WhiteBlock>
  )
}
