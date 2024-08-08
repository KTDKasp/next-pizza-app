import { Variant } from "@/components/shared/group-variants";
import { pizzaSizes, PizzaType } from "@/constants/pizza";
import { ProductVariant } from "@prisma/client";

/**
 * Функция получения доступных размеров
 * 
 * @param type - тип теста
 * @param variants - список вариаций
 * @returns доступные размеры
 */

export const getAvailablePizzaSizes = (type: PizzaType, variants: ProductVariant[]): Variant[] => {
	const filteredPizzasByType = variants.filter(
		(variant) => variant.productType === type
	);
	const availablePizzaSizes = pizzaSizes.map((variant) => ({
		name: variant.name,
		value: variant.value,
		disabled: !filteredPizzasByType.some(
			(pizza) => Number(pizza.productSize) === Number(variant.value)
		),
	}));

	return availablePizzaSizes;
}