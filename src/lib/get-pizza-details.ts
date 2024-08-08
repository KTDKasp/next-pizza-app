import { mapPizzaType, PizzaSize, PizzaType } from '@/constants/pizza';
import { calcPizzaTotalPrice } from './calc-pizza-total-price';
import { Ingredient, ProductVariant } from '@prisma/client';

type ReturnProps = {
	textDetails: string;
	totalPrice: number;
};

export const getPizzaDetails = (
	size: PizzaSize,
	type: PizzaType,
	variants: ProductVariant[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>
): ReturnProps => {
	const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;
	const totalPrice = calcPizzaTotalPrice(
		variants,
		ingredients,
		selectedIngredients,
		type,
		size
	);

	return {
		textDetails,
		totalPrice,
	};
};
