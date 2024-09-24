import { CheckoutTotalDetails, Container, Title, WhiteBlock } from '@/components/shared';
import { Input, Textarea } from '@/components/ui';
import { Package, Percent, Truck } from 'lucide-react';

export default function CheckoutPage() {
	return (
		<Container className="mt-10">
			<Title
				text="Оформление заказа"
				className="font-extrabold text-[36px] mb-8"
			/>
			<div className="flex gap-10">
				{/* Left panel */}
				<div className="flex flex-col gap-10 flex-1 mb-20">
					<WhiteBlock title="1. Корзина">123123123</WhiteBlock>

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
							<Input name="address" className="text-base" placeholder="Введите адрес..." />
							<Textarea className='text-base' placeholder='Комментарии к заказу...' rows={5}/>
						</div>
					</WhiteBlock>
				</div>

				{/* Right panel */}
				<div className='w-[450px]'>
					<WhiteBlock className='p-6 sticky top-4'>
						<div className='flex flex-col gap-1'>
							<span className='text-xl'>Итого:</span>
							<span className='text-[34px] font-extrabold'>3506 ₽</span>
						</div>

						<CheckoutTotalDetails title={
							<div className='flex items-center'>
								<Package size={18} className='mr-2 text-gray-400' />
								Стоимость товаров:
							</div>
						} value="3500 ₽"/>
						<CheckoutTotalDetails title={
							<div className='flex items-center'>
								<Percent size={18} className='mr-2 text-gray-400' />
								Налоги:
							</div>
						} value="3500 ₽"/>
						<CheckoutTotalDetails title={
							<div className='flex items-center'>
								<Truck size={18} className='mr-2 text-gray-400' />
								Доставка:
							</div>
						} value="3500 ₽"/>
					</WhiteBlock>
				</div>
			</div>
		</Container>
	);
}
