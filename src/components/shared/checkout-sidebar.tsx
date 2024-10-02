import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutTotalDetails } from './checkout-total-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '../ui';
import { cn } from '@/lib/utils';

type CheckoutSidebarProps = React.HTMLAttributes<HTMLDivElement> & {
	totalAmount: number;
};

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({ totalAmount, className, ...props }) => {

	const vatPrice = (totalAmount * VAT) / 100;
	const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

	return (
		<WhiteBlock className={cn("p-6 sticky top-4", className)}>
			<div className="flex flex-col gap-1">
				<span className="text-xl">Итого:</span>
				<span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
			</div>

			<CheckoutTotalDetails
				title={
					<div className="flex items-center">
						<Package size={18} className="mr-2 text-gray-400" />
						Стоимость корзины:
					</div>
				}
				value={`${totalAmount} ₽`}
			/>
			<CheckoutTotalDetails
				title={
					<div className="flex items-center">
						<Percent size={18} className="mr-2 text-gray-400" />
						Налоги:
					</div>
				}
				value={`${vatPrice} ₽`}
			/>
			<CheckoutTotalDetails
				title={
					<div className="flex items-center">
						<Truck size={18} className="mr-2 text-gray-400" />
						Доставка:
					</div>
				}
				value={`${DELIVERY_PRICE} ₽`}
			/>

			<Button
				type="submit"
				className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
			>
				Перейти к оплате
				<ArrowRight className="ml-2 w-5" />
			</Button>
		</WhiteBlock>
	);
};
