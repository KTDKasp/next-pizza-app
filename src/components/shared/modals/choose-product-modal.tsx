'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import React from 'react';
import { Product } from '@prisma/client';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/updated-prisma-product';
import { ChoosePizzaForm } from '../choose-pizza-form';

type ChooseProductModalProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	product: ProductWithRelations;
};

export const ChooseProductModal: React.FC<ChooseProductModalProps> = ({
	product,
	className,
	...props
}) => {
	const router = useRouter();
	const isPizzaForm = product.variants[0].productType === 1;

	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => router.back()}
			{...props}
		>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] overflow-hidden bg-white',
					className
				)}
			>
				{isPizzaForm ? (
					<ChoosePizzaForm
					name={product.name}
					imageUrl={product.imageUrl}
					ingredients={[]}
				/>
				) : (
					<ChooseProductForm
						name={product.name}
						imageUrl={product.imageUrl}
						ingredients={[]}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
