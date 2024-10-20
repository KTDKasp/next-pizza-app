import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui';
import { signIn } from 'next-auth/react';

type AuthModalProps = React.HTMLAttributes<HTMLDivElement> & {
	open: boolean;
	onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, className, ...props}) => {
	const handleClose = () => {
		onClose();
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className='w-[450px] bg-white p-10'>
				FORM
				<hr />
				<div className="flex gap-2">
					<Button
						variant='secondary'
						type='button'
						className='gap-2 h-12 p-2 flex-1'
						onClick={() => {
							signIn('github', {
								callbackUrl: '/',
								redirect: true
							})
						}}
					>
						<img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" alt="GitHub Logo" />
						GitHub
					</Button>

					<Button
						variant='secondary'
						type='button'
						className='gap-2 h-12 p-2 flex-1'
						onClick={() => {
							signIn('google', {
								callbackUrl: '/',
								redirect: true
							})
						}}
					>
						<img className="w-6 h-6" src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Logo" />
						Google
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
