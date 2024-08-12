import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Токен корзины не найден' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id)
      }
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Товар не найден в корзине' });
    }

    await prisma.cartItem.update({
      where: {
        id: Number(id)
      },
      data: {
        quantity: data.quantity
      }
    })

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);

  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json({ error: 'Не удалось обновить корзину' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Токен корзины не найден' })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id)
      }
    })

    if (!cartItem) {
      return NextResponse.json({ error: 'Товар не найден в корзине' });
    }

    await prisma.cartItem.delete({
      where: {
        id: Number(id)
      }
    })

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);

  } catch (error) {
    console.log('[CART_DELETE] Server error', error);
    return NextResponse.json({ error: 'Не удалось удалить товар из корзины' }, { status: 500 });
  }
}