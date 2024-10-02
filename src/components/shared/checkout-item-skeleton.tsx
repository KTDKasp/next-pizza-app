import { cn } from '@/lib/utils';
import React from 'react';
import { Skeleton } from '../ui';

type CheckoutItemSkeletonProps = React.HTMLAttributes<HTMLDivElement> & {};

export const CheckoutItemSkeleton: React.FC<CheckoutItemSkeletonProps> = ({
	className,
	...props
}) => {
	return (
		<div className={cn('flex items-center gap-10', className)}>
			<div className="flex items-center gap-5">
				<Skeleton className="h-16 w-16 rounded-full" />
				<div className="flex flex-col items-start gap-3">
					<Skeleton className="h-4 w-[150px]" />
					<Skeleton className="h-4 w-[200px]" />
				</div>
			</div>
			<div className='flex items-center justify-between flex-1'>
				<Skeleton className="h-4 w-[50px]" />
				<Skeleton className="h-7 w-[130px]" />
			</div>
		</div>
	);
};
