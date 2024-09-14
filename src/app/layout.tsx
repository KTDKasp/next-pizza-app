import { Nunito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
});

export default function ParentRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<head>
				<link data-rh="true" rel="icon" href="/pizza-logo.svg" />
			</head>
			<body className={nunito.className}>
        {children}
				<Toaster />
      </body>
		</html>
	);
}
