import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';

interface HeaderProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {}

export const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
	return (
		<header className={cn('border border-b', className)} {...props}>
			<Container className="flex items-center justify-between py-[43px]">
				{/* Left side */}
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

				{/* Right side */}
				<div className="flex items-center gap-4">
					<Button className="gap-2" variant={'outline'}>
						<User size={14} />
						Войти
					</Button>
					<div>
						<Button className="group relative">
							<b>520 ₽</b>
							<span className="h-full w-[1px] bg-white/30 mx-3" />
							<div className="flex items-center gap-2 transition duration-300 group-hover:opacity-0">
								<ShoppingCart className="w-4 h-4 relative" strokeWidth={2} />
								<b>3</b>
							</div>
							<ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
						</Button>
					</div>
				</div>
			</Container>
		</header>
	);
};
