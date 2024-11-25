'use client';

import { Api } from '@/services/api-client';
import { IStory } from '@/services/stories';
import React from 'react';
import { Container } from './container';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';

type StoriesProps = React.HTMLAttributes<HTMLDivElement> & {};

export const Stories: React.FC<StoriesProps> = ({ className }) => {
	const [stories, setStories] = React.useState<IStory[]>([]);
	const [open, setOpen] = React.useState<boolean>(false);
	const [selectedStory, setSelectedStory] = React.useState<IStory>();

	React.useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getAll();
			setStories(data);
		}

		fetchStories();
	}, []);

	const onClickStory = (story: IStory) => {
		setSelectedStory(story);

		if (story.items.length > 0) {
			setOpen(true);
		}
	};

	return (
		<Container
			className={cn('flex items-center justify-between gap-2 my-10', className)}
		>
			{stories.length === 0 &&
				[...Array(6)].map((_, index) => (
					<div
						key={index}
						className="w-[200px] h-[250px] rounded-md bg-gray-200 animate-pulse"
					/>
				))}

			{stories.map((story) => (
				<img
					key={story.id}
					src={story.previewImageUrl}
					alt="Story Image"
					width={200}
					height={250}
					className="rounded-md cursor-pointer"
					onClick={() => onClickStory(story)}
				/>
			))}

			{open && (
				<div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
					<div className="relative" style={{ width: 520 }}>
						<button
							className="absolute z-30 -right-10 -top-5"
							onClick={() => setOpen(false)}
						>
							<X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
						</button>

						<ReactStories
							onAllStoriesEnd={() => setOpen(false)}
							stories={
								selectedStory?.items.map((item) => ({ url: item.sourceUrl })) ||
								[]
							}
							defaultInterval={3000}
							width={520}
							height={800}
						/>
					</div>
				</div>
			)}
		</Container>
	);
};
