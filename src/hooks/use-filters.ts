import React from "react";
import { useSearchParams } from "next/navigation";
import { useSet } from "@siberiacancode/reactuse";

type PriceRangeProps = {
	priceFrom?: number;
	priceTo?: number;
};

export type Filters = {
	sizes: Set<string>;
	pizzaTypes: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceRangeProps;
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceRangeProps, value: number) => void;
	setPizzaTypes: (value: string) => void;
	setSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams();

	// фильтр по цене
	const [prices, setPrices] = React.useState<PriceRangeProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	});

	// фильтр по ингредиентам
	const {value: selectedIngredients, toggle: toggleIngredients} = useSet<string>(
		searchParams.get('ingredients')?.split(',')
	);

	// фильтр по размерам
	const { value: sizes, toggle: toggleSizes } = useSet<string>(
		searchParams.has('sizes') 
			? searchParams.get('sizes')?.split(',') 
			: []
	);

	// фильтр по типам пицц
	const { value: pizzaTypes, toggle: togglePizzaTypes } = useSet<string>(
		searchParams.has('pizzaTypes')
			? searchParams.get('pizzaTypes')?.split(',')
			: []
	);

	const onUpdatePrice = (name: keyof PriceRangeProps, value: number) => {
		setPrices((prevState) => ({ ...prevState, [name]: value }));
	};

	return React.useMemo(() => (
		{
			prices,
			selectedIngredients,
			sizes,
			pizzaTypes,
			setPrices: onUpdatePrice,
			setSelectedIngredients: toggleIngredients,
			setSizes: toggleSizes,
			setPizzaTypes: togglePizzaTypes
		}
	), [prices, selectedIngredients, sizes, pizzaTypes])
}