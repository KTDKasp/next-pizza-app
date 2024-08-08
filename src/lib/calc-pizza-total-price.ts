import { PizzaSize, PizzaType } from '@/constants/pizza';
import { Ingredient, ProductVariant } from '@prisma/client';

/**
 * Функция вычисления общей стоимости пиццы
 * 
 * @param variants - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @returns {number} общая стоимость
 */

export const calcPizzaTotalPrice = (
	variants: ProductVariant[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>,
	type: PizzaType,
	size: PizzaSize
): number => {
	const pizzaPrice =
		variants.find(
			(variant) => variant.productType === type && variant.productSize === size
		)?.price ?? 350;

	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, item) => acc + item.price, 0);

	return pizzaPrice + totalIngredientsPrice;
};
