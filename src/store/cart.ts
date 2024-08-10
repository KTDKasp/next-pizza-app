import { Api } from "@/services/api-client";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export type ICartItem = {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	pizzaSize?: number | null;
	type?: number | null;
	ingredients: Array<{name: string, price: number}>;
}

interface CartState {
	loading: boolean;
	error: boolean;
	totalAmount: number;
	items: ICartItem[];
}

interface CartAction {

	// Get items from cart
	fetchCartItems: () => Promise<void>;

	// Request for upadating item quantity
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;

	// Request for adding item to cart
	addCartItem: (values: any) => Promise<void>;

	// Request for removing item from cart
	removeCartItem: (id: number) => Promise<void>;
}

const cartSlice: StateCreator<CartState & CartAction, [['zustand/devtools', never]]> = (set, get) => ({
	totalAmount: 0,
	error: false,
	loading: true,
	items: [],
	
	fetchCartItems: async () => {
		try {
			set({loading: true, error: false});
			const data = await Api.cart.fetchCart();
			set(getCartDetails(data))
		} catch (error) {
			console.error(error);
			set({error: true})
		} finally {
			set({loading: false})
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {},

	addCartItem: async (values: any) => {},

	removeCartItem: async (id: number) => {},
})

export const useCartStore = create<CartState & CartAction>()(devtools(cartSlice))