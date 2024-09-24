import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { User } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';

interface HeaderProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	hasSearch?: boolean;
	hasCart?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
	hasSearch = true,
	hasCart = true,
	className,
	...props
}) => {
	return (
		<header className={cn('border-b', className)} {...props}>
			<Container className="flex items-center justify-between py-[43px]">
				{/* Left side */}
				<Link href={'/'}>
					<div className="flex items-center gap-4">
						<Image
							src="/pizza-logo.png"
							alt="Pizza logo"
							width={35}
							height={35}
						/>
						<div>
							<h1 className="text-2xl uppercase font-black">Next Pizza</h1>
							<p className="text-sm text-gray-400 leading-3">
								вкусней уже некуда
							</p>
						</div>
					</div>
				</Link>

				{/* Search */}
				{hasSearch && (
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				)}

				{/* Right side */}
				<div className="flex items-center gap-4">
					<Button className="gap-2" variant={'outline'}>
						<User size={14} />
						Войти
					</Button>
					{ hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
