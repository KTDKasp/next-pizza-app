'use client';

import React from 'react';
import { FilterCheckboxProps, FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui/input';

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems: Item[];
	limit?: number;
	loading?: boolean;
	searchInputPlaceholder?: string;
	onClickCheckbox?: (id: string) => void;
	defaultValue?: string[];
	selected?: Set<string>;
	className?: string;
	name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Поиск...',
	className,
	loading,
	onClickCheckbox,
	selected,
	name,
}) => {
	const [showAll, setShowAll] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  
  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }
  
  const ingridientList = showAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase())) : defaultItems.slice(0, limit);

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>

			{showAll && (
				<div className="mb-5">
					<Input
            onChange={(e) => handleSearchValue(e)}
            value={searchValue}
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
					/>
				</div>
			)}

			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{ingridientList.map((item, index) => (
					<FilterCheckbox
						onCheckedChange={(ids) => console.log(ids)}
						text={item.text}
						value={item.value}
						checked={false}
						endAdornment={item.endAdornment}
						key={String(item.value)}
						name={item.name}
					/>
				))}

        {items.length > limit && (
          <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
            <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
              {showAll ? 'Скрыть' : '+ Показать все'}
            </button>
          </div>
        )}
			</div>
		</div>
	);
};
