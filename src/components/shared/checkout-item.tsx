'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';

interface CheckoutItemProps extends CartItemProps {
	onClickCountButton?: (type: 'plus' | 'minus') => void;
	onClickRemoveButton?: () => void;
	className?: string;
}

export const CheckoutItem: React.FC<CheckoutItemProps> = ({
  name,
  price,
  imageUrl,
  quantity,
	details,
  disabled,
  className,
  onClickCountButton,
  onClickRemoveButton,
}) => {
  return (
    <div className={cn('flex items-center justify-between', {
			'opacity-50 pointer-events-none': disabled,
		}, className)}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetails.CountButton onClickCountButton={onClickCountButton} value={quantity} />
        <button onClick={onClickRemoveButton}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};
