'use client';

import React from 'react';
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
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Api } from '@/services/api-client';

export default function CheckoutPage() {
	const [submitting, setSubmitting] = React.useState(false);
	const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart();
	const { data: session } = useSession();

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

	React.useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe();
			const [firstName, lastName] = data.fullName.split(' ');

			form.setValue('firstName', firstName);
			form.setValue('lastName', lastName);
			form.setValue('email', data.email);
		}

		if (session) {
			fetchUserInfo();
		}
	}, [session])

	const onSubmitForm: SubmitHandler<CheckoutFormValues> = async (data) => {
		try {
			setSubmitting(true);

			const url = await createOrder(data);

			toast.success('Заказ успешно оформлен! Переход на оплату...', {
				icon: '✅',
			})

			if (url) {
				location.href = url;
			}
			
		} catch (error) {
			setSubmitting(false);
			console.log(error);
			toast.error('Не удалось создать заказ', {
				icon: '❌',
			});
		}
	};

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
								loading={loading}
								removeCartItem={removeCartItem}
								updateItemQuantity={updateItemQuantity}
							/>

							<CheckoutPersonalData className={loading ? 'opacity-40 pointer-events-none' : ''}/>

							<CheckoutDeliveryAddress className={loading ? 'opacity-40 pointer-events-none' : ''}/>
						</div>

						{/* Right panel */}
						<div className="w-[450px]">
							<CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	);
}
