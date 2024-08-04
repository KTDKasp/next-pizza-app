import React from "react"
import { Ingredient } from "@prisma/client"
import { useSet } from '@siberiacancode/reactuse';
import { Api } from "@/services/api-client"

type IngredientItem = Pick<Ingredient, 'id' | 'name'>;

type ReturnProps = {
	ingredients: IngredientItem[];
	loading: boolean;
	selectedIds: Set<string>;
	onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {

	const [ingredients, setIngredients] = React.useState<ReturnProps['ingredients']>([])
	const [loading, setLoading] = React.useState<boolean>(true)
	const {value: selectedIds, toggle} = useSet<string>([]);

	React.useEffect(() => {
		setLoading(true);
		Api.ingredients.getAllIngredients().then((data) => {
			setIngredients(data.map(item => ({
				id: item.id,
				name: item.name
			})));
		}).catch((e) => console.error(e)).finally(() => setLoading(false))
	}, [])

	return {
		ingredients,
		loading,
		onAddId: toggle,
		selectedIds
	};
}