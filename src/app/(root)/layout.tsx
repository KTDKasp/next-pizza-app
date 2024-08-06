import type { Metadata } from 'next';
import { Header } from '@/components/shared/header';
import '../globals.css';

export const metadata: Metadata = {
	title: 'Next Pizza App',
	description: 'Самая лучшая пицца в городе!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="min-h-dvh">
			<Header className="mb-10" />
			{children}
		</main>
	);
}
