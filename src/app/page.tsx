import {
	Categories,
	Container,
	Filters,
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
			<Container className='pb-14'>
				<div className='flex gap-12'>

					{/* Filters */}
					<div className='w-[245px]'>
						<Filters />
					</div>

					{/* Pizzas */}
					<div className='flex-1'>
						<div className='flex flex-col gap-[50px]'>
							List of Pizzas
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
