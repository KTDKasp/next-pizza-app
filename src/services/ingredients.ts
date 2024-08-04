import { Ingredient } from "@prisma/client";
import { axiosInstance } from "./axiosInstance"
import { ApiRoutes } from "./constants"

export const getAllIngredients = async (): Promise<Ingredient[]> => {
	const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)

	return data;
}