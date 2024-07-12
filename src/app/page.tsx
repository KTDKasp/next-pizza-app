import {
	Categories,
	Container,
	SortPopup,
	Title,
	TopBar,
} from '@/components/shared';

export default function Home() {
	return (
		<>
			<Container className="">
				<Title text="Все пиццы" size="lg" className="font-extrabold" />
			</Container>
			<TopBar />
		</>
	);
}
