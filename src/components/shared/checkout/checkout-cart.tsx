import React from 'react';
import { WhiteBlock } from '../white-block';
import { CartStateItem } from '@/lib/get-cart-details';
import { updateQuantityOnClick } from '@/lib/update-quantity-onclick';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { getCartItemDetails } from '@/lib';
import { CheckoutItem } from '../checkout-item';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';

type CheckoutCartProps = React.HTMLAttributes<HTMLDivElement> & {
  items: CartStateItem[];
  loading?: boolean;
  removeCartItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
};

export const CheckoutCart: React.FC<CheckoutCartProps> = ({
  removeCartItem,
  items,
  loading,
  updateItemQuantity,
  className,
  ...props
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {loading
          ? [...Array(4)].map((_, index) => (
              <CheckoutItemSkeleton key={index} />
            ))
          : items.map((item) => (
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
  );
};
