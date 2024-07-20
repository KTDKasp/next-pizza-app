import { cn } from '@/lib/utils'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { Title } from './title'
import { FilterCheckbox } from './filter-checkbox'
import { Input } from '../ui'
import { RangeSlider } from './range-slider'
import { CheckboxFiltersGroup } from './checkbox-filters-group'

interface FiltersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Filters: React.FC<FiltersProps> = ({ className, ...props }) => {
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
				defaultItems={[
					{
						text: 'Сырный соус',
						value: '1',
					},
					{
						text: 'Моцарелла',
						value: '2',
					},
					{
						text: 'Чеснок',
						value: '3',
					},
					{
						text: 'Соленные огурчики',
						value: '4',
					},
					{
						text: 'Красный лук',
						value: '5',
					},
					{
						text: 'Томаты',
						value: '6',
					}
				]}
				items={[
					{
						text: 'Сырный соус',
						value: '1',
					},
					{
						text: 'Моцарелла',
						value: '2',
					},
					{
						text: 'Чеснок',
						value: '3',
					},
					{
						text: 'Соленные огурчики',
						value: '4',
					},
					{
						text: 'Красный лук',
						value: '5',
					},
					{
						text: 'Томаты',
						value: '6',
					},
					{
						text: 'Сырный соус',
						value: '1',
					},
					{
						text: 'Моцарелла',
						value: '2',
					},
					{
						text: 'Чеснок',
						value: '3',
					},
					{
						text: 'Соленные огурчики',
						value: '4',
					},
					{
						text: 'Красный лук',
						value: '5',
					},
					{
						text: 'Томаты',
						value: '6',
					}
				]}
			/>
		</div>
	)
}
