export const updateQuantityOnClick = (
	quantity: number,
	type: 'plus' | 'minus'
) => {
	return type === 'plus' ? quantity + 1 : quantity - 1;
};