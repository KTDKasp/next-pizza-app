'use client';

import React from 'react';
import { useClickOutside } from '@siberiacancode/reactuse';
import { useDebounceValue } from '@siberiacancode/reactuse';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';

interface SearchInputProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {}

export const SearchInput: React.FC<SearchInputProps> = ({
	className,
	...props
}) => {
	const [searchQuery, setSearchQuery] = React.useState<string>('');
	const [focused, setFocused] = React.useState<boolean>(false);
	const [products, setProducts] = React.useState<Product[]>([]);
	const clickOutsideRef = useClickOutside<HTMLDivElement>(() => {
		setFocused(false);
	});

	const debouncedSearchQuery = useDebounceValue(searchQuery, 250);

	const onClickItem = () => {
		setFocused(false);
		setSearchQuery('');
	};

	React.useEffect(() => {
		Api.products.search(debouncedSearchQuery).then((items) => {
			setProducts(items);
		}).catch((e) => console.error(e));
	}, [debouncedSearchQuery]);

	return (
		<>
			{focused && (
				<div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"></div>
			)}
			<div
				ref={clickOutsideRef}
				className={cn(
					'flex rounded-2xl flex-1 justify-between relative h-11 z-30',
					className
				)}
				{...props}
			>
				<Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />

				<input
					className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
					type="text"
					placeholder="Найти пиццу..."
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				{products.length > 0 && (
					<div
						className={cn(
							'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
							focused && 'visible opacity-100 top-12'
						)}
					>
						{products.map((product) => (
							<Link
								key={product.id}
								onClick={onClickItem}
								className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
								href={`/product/${product.id}`}
							>
								<img
									className="rounded-sm h-8 w-8"
									src={product.imageUrl}
									alt={product.name}
								/>
								<span>{product.name}</span>
							</Link>
						))}
					</div>
				)}
			</div>
		</>
	);
};
