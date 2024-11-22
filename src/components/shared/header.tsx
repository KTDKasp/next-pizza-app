'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Container } from './container';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';


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
	const router = useRouter();
	const searchParams = useSearchParams();
	const [openAuthModal, setOpenAuthModal] = React.useState(false);

	// Заменить на нормальную страницу успешной оплаты заказа
	React.useEffect(() => {
		let toastMessage = '';

		if (searchParams.has('paid')) {
			toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
		}

		if (searchParams.has('verified')) {
			toastMessage = 'Почта успешно подтверждена!';
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/');
				toast.success(toastMessage, {
					duration: 3000,
				})
			}, 1000)
		}
	}, []);

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
					<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}/>
					<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
					{ hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	);
};
