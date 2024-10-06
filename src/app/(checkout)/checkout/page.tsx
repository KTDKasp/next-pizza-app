'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	CheckoutCart,
	CheckoutDeliveryAddress,
	checkoutFormSchema,
	CheckoutFormValues,
	CheckoutPersonalData,
	CheckoutSidebar,
	Container,
	Title,
} from '@/components/shared';
import { useCart } from '@/hooks';

export default function CheckoutPage() {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	});

	const onSubmitForm: SubmitHandler<CheckoutFormValues> = (data) => {};

	return (
		<Container className="mt-10">
			<Title
				text="Оформление заказа"
				className="font-extrabold text-[36px] mb-8"
			/>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmitForm)}>
					<div className="flex gap-10">
						{/* Left panel */}
						<div className="flex flex-col gap-10 flex-1 mb-20">
							<CheckoutCart
								items={items}
								removeCartItem={removeCartItem}
								updateItemQuantity={updateItemQuantity}
							/>

							<CheckoutPersonalData />

							<CheckoutDeliveryAddress />
						</div>

						{/* Right panel */}
						<div className="w-[450px]">
							<CheckoutSidebar totalAmount={totalAmount} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
