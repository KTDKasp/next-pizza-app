import React from 'react';
import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

type ProfileButtonProps = React.HTMLAttributes<HTMLDivElement> & {
	onClickSignIn?: () => void;
};

export const ProfileButton: React.FC<ProfileButtonProps> = ({
	onClickSignIn,
	className,
}) => {
	const { data: session } = useSession();
	console.log(session);

	return (
		<div className={className}>
			{!session ? (
				<Button onClick={onClickSignIn} className="gap-2" variant={'outline'}>
					<User size={14} />
					Войти
				</Button>
			) : (
				<Link href="/profile">
					<Button variant="secondary" className="flex items-center gap-2">
						{session.user?.image ? (
							<img
								src={session.user?.image}
								alt={session.user?.name as string}
								width={18}
								height={18}
								className="rounded-full"
							/>
						) : (
							<CircleUser size={18} />
						)}
						{session.user?.name ? session.user?.name : 'Профиль'}
					</Button>
				</Link>
			)}
		</div>
	);
};
