import { Api } from "@/services/api-client"
import { Ingredient } from "@prisma/client"
import React from "react"

type IngredientItem = Pick<Ingredient, 'id' | 'name'>;

type ReturnProps = {
	ingredients: IngredientItem[];
	loading: boolean;
}

export const useFilterIngredients = (): ReturnProps => {

	const [ingredients, setIngredients] = React.useState<ReturnProps['ingredients']>([])
	const [loading, setLoading] = React.useState<boolean>(true)

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
		loading
	};
}