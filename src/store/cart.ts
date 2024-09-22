import { getCartDetails } from '@/lib';
import { CartStateItem } from '@/lib/get-cart-details';
import { Api } from '@/services/api-client';
import { CreateCartItemValues } from '@/services/dto/cart.dto';
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

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
	addCartItem: (values: CreateCartItemValues) => Promise<void>;

	// Request for removing item from cart
	removeCartItem: (id: number) => Promise<void>;
}

const cartSlice: StateCreator<
	CartState & CartAction,
	[['zustand/devtools', never]]
> = (set, get) => ({
	totalAmount: 0,
	error: false,
	loading: true,
	items: [],

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false }, false, 'cart/fetchCartItems');
			const data = await Api.cart.getCart();
			set(getCartDetails(data), false, 'cart/fetchCartItems');
		} catch (error) {
			console.error(error);
			set({ error: true }, false, 'cart/fetchCartItems');
		} finally {
			set({ loading: false }, false, 'cart/fetchCartItems');
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false }, false, 'cart/updateItemQuantity');
			const data = await Api.cart.updateItemQuantity(id, quantity);
			set(getCartDetails(data), false, 'cart/updateItemQuantity');
		} catch (error) {
			console.error(error);
			set({ error: true }, false, 'cart/updateItemQuantity');
		} finally {
			set({ loading: false }, false, 'cart/updateItemQuantity');
		}
	},

	addCartItem: async (values: CreateCartItemValues) => {
		try {
			set({ loading: true, error: false }, false, 'cart/addCartItem');
			const data = await Api.cart.addCartItem(values);
			set(getCartDetails(data), false, 'cart/addCartItem');
		} catch (error) {
			console.error(error);
			set({ error: true }, false, 'cart/addCartItem');
		} finally {
			set({ loading: false }, false, 'cart/addCartItem');
		}
	},

	removeCartItem: async (id: number) => {
		try {
			set(
				(state) => ({
					loading: true,
					error: false,
					items: state.items.map((item) =>
						item.id === id ? { ...item, disabled: true } : item
					),
				}),
				false,
				'cart/removeCartItem'
			);
			const data = await Api.cart.removeCartItem(id);
			set(getCartDetails(data), false, 'cart/removeCartItem');
		} catch (error) {
			console.error(error);
			set({ error: true }, false, 'cart/removeCartItem');
		} finally {
			set(
				(state) => ({
					loading: false,
					items: state.items.map((item) => ({ ...item, disabled: false })
					),
				}),
				false,
				'cart/removeCartItem'
			);
		}
	},
});

export const useCartStore = create<CartState & CartAction>()(
	devtools(cartSlice)
);
