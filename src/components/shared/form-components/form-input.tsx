'use client';

import React from 'react'
import { useFormContext } from 'react-hook-form';
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
	const {
		register,
		formState: { errors },
		watch,
		setValue
	} = useFormContext();

	const value = watch(name);
	const errorText = errors[name]?.message as string;

	const onClickClear = () => {
		setValue(name, '', { shouldValidate: true });
	}

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
				<Input className='h-12 text-base' {...register(name)} {...props}/>
				{value && <ClearButton onClickClearButton={onClickClear} />}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	)
}