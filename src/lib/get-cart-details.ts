import { CartDTO } from "@/services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	pizzaSize?: number | null;
	pizzaType?: number | null;
	ingredients: Array<{name: string, price: number}>;
}

type ReturnProps = {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productVariant.product.name,
    imageUrl: item.productVariant.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productVariant.productSize,
    pizzaType: item.productVariant.productType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price
    }))
  }))

  return {
    items,
    totalAmount: data.totalAmount,
  }
};