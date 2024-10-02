'use client';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
	CheckoutItem,
	CheckoutSidebar,
	Container,
	FormInput,
	Title,
	WhiteBlock,
} from '@/components/shared';
import { Input, Textarea } from '@/components/ui';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { useCart } from '@/hooks';
import { getCartItemDetails } from '@/lib';
import { updateQuantityOnClick } from '@/lib/update-quantity-onclick';
import { CheckoutCart, CheckoutDeliveryAddress, CheckoutPersonalData } from '@/components/shared/checkout';

export default function CheckoutPage() {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

	const form = useForm({
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		}
	});

	return (
		<Container className="mt-10">
			<Title
				text="Оформление заказа"
				className="font-extrabold text-[36px] mb-8"
			/>
			<div className="flex gap-10">
				{/* Left panel */}
				<div className="flex flex-col gap-10 flex-1 mb-20">
					<CheckoutCart items={items} removeCartItem={removeCartItem} updateItemQuantity={updateItemQuantity}/>

					<CheckoutPersonalData />
					
					<CheckoutDeliveryAddress />

				</div>



				{/* Right panel */}
				<div className="w-[450px]">
					<CheckoutSidebar totalAmount={totalAmount} />
				</div>
			</div>
		</Container>
	);
}
