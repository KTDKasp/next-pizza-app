import React from 'react'

interface ProductCardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export const ProductCard: React.FC<ProductCardProps> = ({...props}) => {
	return (
		<div {...props}>
			
		</div>
	)
}