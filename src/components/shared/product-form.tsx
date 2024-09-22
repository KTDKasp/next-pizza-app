'use client';

import React from 'react'
import { ProductWithRelations } from '@/@types/updated-prisma-product';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

type ProductFormProps = {
	product: ProductWithRelations;
	onSubmitAction?: VoidFunction;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmitAction }) => {
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
			onSubmitAction?.();
		} catch (error) {
			toast.error('Произошла ошибка при добавлении в корзину');
			console.error(error);
		}
	}

	if (isPizzaForm) {
		return <ChoosePizzaForm
		name={product.name}
		imageUrl={product.imageUrl}
		ingredients={product.ingredients}
		variants={product.variants}
		onClickAddToCart={onSubmitAdd}
		loading={loading}
	/>
	}

	return <ChooseProductForm
	name={product.name}
	imageUrl={product.imageUrl}
	onClickAddToCart={onSubmitAdd}
	price={fisrtVariant.price}
	loading={loading}
/>
}