import React from 'react'
import { RequiredSymbol } from '../required-symbol';
import { Input } from '@/components/ui';
import { ErrorText } from '../error-text';
import { ClearButton } from '../clear-button';

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label?: string;
	required?: boolean;
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
				<ClearButton />
			</div>

			<ErrorText text='Поле обязательно для заполнения' className='mt-2' />
		</div>
	)
}