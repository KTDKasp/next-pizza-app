'use client';

import {
	CheckoutItem,
	CheckoutSidebar,
	Container,
	Title,
	WhiteBlock,
} from '@/components/shared';
import { Input, Textarea } from '@/components/ui';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { useCart } from '@/hooks';
import { getCartItemDetails } from '@/lib';
import { updateQuantityOnClick } from '@/lib/update-quantity-onclick';

export default function CheckoutPage() {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();

	return (
		<Container className="mt-10">
			<Title
				text="Оформление заказа"
				className="font-extrabold text-[36px] mb-8"
			/>
			<div className="flex gap-10">
				{/* Left panel */}
				<div className="flex flex-col gap-10 flex-1 mb-20">
					<WhiteBlock title="1. Корзина">
						<div className="flex flex-col gap-5">
							{items.map((item) => (
								<CheckoutItem
									key={item.id}
									id={item.id}
									name={item.name}
									price={item.price}
									imageUrl={item.imageUrl}
									quantity={item.quantity}
									details={getCartItemDetails(
										item.ingredients,
										item.pizzaType as PizzaType,
										item.pizzaSize as PizzaSize
									)}
									disabled={item.disabled}
									onClickRemoveButton={() => removeCartItem(item.id)}
									onClickCountButton={(type) =>
										updateItemQuantity(
											item.id,
											updateQuantityOnClick(item.quantity, type)
										)
									}
								/>
							))}
						</div>
					</WhiteBlock>

					<WhiteBlock title="2. Персональные данные">
						<div className="grid grid-cols-2 gap-5">
							<Input name="firstName" className="text-base" placeholder="Имя" />
							<Input
								name="lastName"
								className="text-base"
								placeholder="Фамилия"
							/>
							<Input name="email" className="text-base" placeholder="E-Mail" />
							<Input name="phone" className="text-base" placeholder="Телефон" />
						</div>
					</WhiteBlock>

					<WhiteBlock title="3. Адрес доставки">
						<div className="flex flex-col gap-5">
							<Input
								name="address"
								className="text-base"
								placeholder="Введите адрес..."
							/>
							<Textarea
								className="text-base"
								placeholder="Комментарии к заказу..."
								rows={5}
							/>
						</div>
					</WhiteBlock>
				</div>

				{/* Right panel */}
				<div className="w-[450px]">
					<CheckoutSidebar totalAmount={totalAmount} />
				</div>
			</div>
		</Container>
	);
}
