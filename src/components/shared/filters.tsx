'use client';

import { cn } from '@/lib/utils'
import React from 'react'
import { Title } from './title'
import { FilterCheckbox } from './filter-checkbox'
import { Input } from '../ui'
import { RangeSlider } from './range-slider'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { useFilterIngredients } from '@/hooks/useFilterIngredients'

interface FiltersProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Filters: React.FC<FiltersProps> = ({ className, ...props }) => {
	const { ingredients, loading } = useFilterIngredients();

	const ingredientItems = ingredients.map(ingredient => ({ value: String(ingredient.id), text: ingredient.name }));

	return (
		<div className={cn('', className)} {...props}>

			<Title text='Фильтры' size='sm' className='mb-7 font-bold'/>
			<div className='flex flex-col gap-[15px]'>
				<FilterCheckbox text='Можно собирать' value='1'/>
				<FilterCheckbox text='Новинки' value='2'/>
			</div>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input type='number' placeholder='0' min={0} max={2000} defaultValue={0}/>
					<Input type='number' min={100} max={2000} placeholder='2000'/>
				</div>

				<RangeSlider min={0} max={5000} step={10} value={[0, 5000]}/>
			</div>

			<CheckboxFiltersGroup 
				title='Ингредиенты'
				className='mt-5'
				limit={6}
				defaultItems={ingredientItems.slice(0, 6)}
				items={ingredientItems}
				loading={loading}
			/>
		</div>
	)
}
