'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import NextToploader from 'nextjs-toploader';

type ProvidersProps = React.HTMLAttributes<HTMLDivElement> & {}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
	return (
		<>
			<SessionProvider>
				{children}
			</SessionProvider>
			<Toaster />
			<NextToploader />
		</>
	)
}
