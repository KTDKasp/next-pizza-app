import React from 'react'
import { RequiredSymbol } from '../required-symbol';
import { Input } from '@/components/ui';

type FormInputProps = {
	name: string;
	label?: string;
	required?: boolean;
	className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ name, label, required, className, ...props }) => {
	return (
		<div className={className}>
			{
				label && (
					<p className='font-medium mb-2'>
						{label} {required && <RequiredSymbol />}
					</p>
				)
			}

			<div className="relative">
				<Input className='h-12 text-base' {...props}/>
			</div>
		</div>
	)
}