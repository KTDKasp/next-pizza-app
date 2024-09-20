'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import React from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/updated-prisma-product';
import { ChoosePizzaForm } from '../choose-pizza-form';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cart';

type ChooseProductModalProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	product: ProductWithRelations;
};

export const ChooseProductModal: React.FC<ChooseProductModalProps> = ({
	product,
	className,
	...props
}) => {
	const router = useRouter();
	const fisrtVariant = product.variants[0];
	const isPizzaForm = Boolean(fisrtVariant.productType);
	const [loading, addCartItem] = useCartStore((state) => [state.loading, state.addCartItem]);

	const onSubmitAdd = async (productVariantId?: number, ingredients?: number[]) => {
		try {
			const variantId = productVariantId ?? fisrtVariant.id;

			await addCartItem({
				productVariantId: variantId,
				ingredients,
			});
			toast.success('Пицца добавлена в корзину');
			router.back();
		} catch (error) {
			toast.error('Произошла ошибка при добавлении в корзину');
			console.error(error);
		}
	}

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => router.back()}
			{...props}
		>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[550px] overflow-hidden bg-white',
					className
				)}
			>

				{isPizzaForm ? (
					<ChoosePizzaForm
						name={product.name}
						imageUrl={product.imageUrl}
						ingredients={product.ingredients}
						variants={product.variants}
						onClickAddToCart={onSubmitAdd}
						loading={loading}
					/>
				) : (
					<ChooseProductForm
						name={product.name}
						imageUrl={product.imageUrl}
						onClickAddToCart={onSubmitAdd}
						price={fisrtVariant.price}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
