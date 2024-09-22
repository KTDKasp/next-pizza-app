'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import React from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/updated-prisma-product';
import { ProductForm } from '../product-form';

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
	
	return (
		<Dialog
			open={Boolean(product)}
			onOpenChange={() => router.back()}
			{...props}
		>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[550px] overflow-hidden bg-white',
					className
				)}
			>
				<ProductForm product={product} onSubmitAction={() => router.back()} />
			</DialogContent>
		</Dialog>
	);
};
