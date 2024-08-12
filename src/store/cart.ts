import { getCartDetails } from "@/lib";
import { CartStateItem } from "@/lib/get-cart-details";
import { Api } from "@/services/api-client";
import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface CartState {
	loading: boolean;
	error: boolean;
	totalAmount: number;
	items: CartStateItem[];
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
			const data = await Api.cart.getCart();
			set(getCartDetails(data), false, 'cart/fetchCartItems');
		} catch (error) {
			console.error(error);
			set({error: true})
		} finally {
			set({loading: false})
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({loading: true, error: false});
			const data = await Api.cart.updateItemQuantity(id, quantity);
			set(getCartDetails(data), false, 'cart/updateItemQuantity');
		} catch (error) {
			console.error(error);
			set({error: true})
		} finally {
			set({loading: false})
		}
	},

	addCartItem: async (values: any) => {},

	removeCartItem: async (id: number) => {
		try {
			set({loading: true, error: false});
			const data = await Api.cart.removeCartItem(id);
			set(getCartDetails(data), false, 'cart/removeCartItem');
		} catch (error) {
			console.error(error);
			set({error: true})
		} finally {
			set({loading: false})
		}
	},
})

export const useCartStore = create<CartState & CartAction>()(devtools(cartSlice))