import React from "react";
import { useSet } from "@siberiacancode/reactuse";

import { Variant } from "@/components/shared/group-variants";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { getAvailablePizzaSizes } from "@/lib";
import { ProductVariant } from "@prisma/client";

type ReturnProps = {
	size: PizzaSize;
	type: PizzaType;
	availableSizes: Variant[];
	selectedIngredients: Set<number>;
	setSize: (size: PizzaSize) => void;
	setType: (type: PizzaType) => void;
	addIngredient: (id: number) => void;
}

export const usePizzaOptions = (variants: ProductVariant[]): ReturnProps => {
	const [size, setSize] = React.useState<PizzaSize>(20);
	const [type, setType] = React.useState<PizzaType>(1);

	const { value: selectedIngredients, toggle: addIngredient } =
	useSet<number>();

	const availableSizes = getAvailablePizzaSizes(type, variants);

	React.useEffect(() => {
		const isAvailableSize = availableSizes.find(
			(pizza) => Number(pizza.value) === size && !pizza.disabled
		);
		const availableSize = availableSizes.find((pizza) => !pizza.disabled);

		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [type]);

	return {
		size,
		type,
		availableSizes,
		selectedIngredients,
		setSize,
		setType,
		addIngredient
	}
}