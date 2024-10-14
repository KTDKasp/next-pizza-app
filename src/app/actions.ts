'use server';

import { CheckoutFormValues, PayOrderTemplate } from '@/components/shared';
import { sendEmail } from '@/lib';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariant: {
              include: {
                product: true,
              }
            }
          }
        }
      },
      where: {
        tokenId: cartToken
      }
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (userCart.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const order = await prisma.order.create({
      data: {
        tokenId: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items)
      }
    })

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      }
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      }
    })

    // #TODO: Сделать создание ссылки оплаты

    await sendEmail(
      data.email,
      'Next Pizza / Оплатите заказ #' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: 'https://shazoo.ru',
      }),
    );

  } catch (error) {
    console.log('[CreateOrder] Server error', error);
  }
}
