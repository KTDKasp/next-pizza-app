'use client';

import React from 'react';
import { Ingredient, ProductVariant } from '@prisma/client';

import { cn } from '@/lib/utils';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';
import { pizzaTypes } from '@/constants/pizza';
import type { PizzaType, PizzaSize } from '@/constants/pizza';
import { GroupVariants } from './group-variants';
import { IngredientCard } from './ingredient-card';
import { getPizzaDetails } from '@/lib';
import { usePizzaOptions } from '@/hooks';

type ChoosePizzaFormProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	name: string;
	imageUrl: string;
	ingredients: Ingredient[];
	variants: ProductVariant[];
	onClickAddToCart: (variantId: number, ingredients: number[]) => void;
};

export const ChoosePizzaForm: React.FC<ChoosePizzaFormProps> = ({
	name,
	imageUrl,
	ingredients,
	variants,
	onClickAddToCart,
	className,
	...props
}) => {
	const {
		size,
		type,
		availableSizes: availablePizzaSizes,
		selectedIngredients,
		currentVariantId,
		setSize,
		setType,
		addIngredient,
	} = usePizzaOptions(variants);

	const { textDetails, totalPrice } = getPizzaDetails(
		size,
		type,
		variants,
		ingredients,
		selectedIngredients
	);

	const handleClickAdd = () => {
		if (currentVariantId) {
			onClickAddToCart(currentVariantId, Array.from(selectedIngredients));
		}
	};

	return (
		<div className={cn(className, 'flex flex-1')} {...props}>
			<ProductImage imageUrl={imageUrl} size={size} />

			<div className="w-[500px] bg-[#f7f6f5] p-7">
				<div className="max-h-[610px] my-4 overflow-auto scrollbar">
					<Title text={name} size="md" className="font-extrabold mb-1" />

					<p className="text-gray-400 mb-5">{textDetails}</p>

					<div className="flex flex-col gap-[10px] mb-[14px] pr-3">
						<GroupVariants
							items={availablePizzaSizes}
							selectedValue={String(size)}
							onClickVariant={(value) => setSize(Number(value) as PizzaSize)}
						/>

						<GroupVariants
							items={pizzaTypes}
							selectedValue={String(type)}
							onClickVariant={(value) => setType(Number(value) as PizzaType)}
						/>
					</div>

					<Title
						text="Добавить по вкусу"
						size="sm"
						className="font-bold mb-3"
					/>

					<div className="bg-gray-50 rounded-md p-4">
						<div className="flex flex-wrap gap-3">
							{ingredients.map((ingredient) => (
								<IngredientCard
									key={ingredient.id}
									name={ingredient.name}
									price={ingredient.price}
									imageUrl={ingredient.imageUrl}
									active={selectedIngredients.has(ingredient.id)}
									onClickIngredient={() => addIngredient(ingredient.id)}
								/>
							))}
						</div>
					</div>
				</div>

				<Button
					onClick={handleClickAdd}
					className="h-[55px] px-10 text-base rounded-[18px] w-full"
				>
					Добавить в корзину за {totalPrice} ₽
				</Button>
			</div>
		</div>
	);
};
