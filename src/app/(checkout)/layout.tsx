import { Metadata } from 'next';
import { Container, Header } from '@/components/shared';

export const metadata: Metadata = {
	title: 'Next Pizza | Корзина',
	description: 'Generated by Next.js',
};

export default function CheckoutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="min-h-screen bg-[#F4F1EE]">
			<Container>
				<Header hasSearch={false} hasCart={false} className="border-gray-200" />
				{children}
			</Container>
		</main>
	);
}
