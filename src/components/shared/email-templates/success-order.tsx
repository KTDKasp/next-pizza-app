import { CartItemDTO } from '@/services/dto/cart.dto';
import React from 'react';

interface SuccessOrderTemplateProps {
  orderId: number;
  totalAmount: number;
  items: CartItemDTO[];
}

export const SuccessOrderTemplate: React.FC<SuccessOrderTemplateProps> = ({
  orderId,
  totalAmount,
  items,
}) => (
  <div>
    <h1>Спасибо за покупку! 🎉</h1>
    <p>
      Ваш заказ #{orderId} на сумму <b>{totalAmount} ₽</b> оплачен. Список
      товаров:
    </p>

    <hr />

    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productVariant.product.name} | {item.productVariant.price} ₽ *{' '}
          {item.quantity} шт. = {item.productVariant.price * item.quantity} ₽
        </li>
      ))}
    </ul>
  </div>
);
