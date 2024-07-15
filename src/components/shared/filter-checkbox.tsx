import React from 'react';
import { Checkbox } from '../ui';

export interface FilterCheckboxProps {
	text: string;
	value: string;
	name?: string;
	endAdornment?: React.ReactNode;
	onCheckedChange?: (checked: boolean) => void;
	checked?: boolean; 
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
	text,
	value,
	name,
	checked,
	endAdornment,
	onCheckedChange
}) => {
	return (
		<div className='flex items-center space-x-2'>
			<Checkbox
				id={`checkbox-${String(value)}`} 
				onCheckedChange={onCheckedChange}
				checked={checked}
				value={value}
				className='rounded-[8px] w-6 h-6'
				name={name}
			/>
			<label htmlFor={`checkbox-${String(value)}`} className='leading-none cursor-pointer flex-1'>
				{text}
			</label>
			{endAdornment}
		</div>
	)
}
