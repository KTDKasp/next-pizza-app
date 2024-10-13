'use client';

import React from 'react'
import { RequiredSymbol } from '../required-symbol';
import { Textarea } from '@/components/ui';
import { ErrorText } from '../error-text';
import { ClearButton } from '../clear-button';
import { useFormContext } from 'react-hook-form';

type FormTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	name: string;
	label?: string;
	required?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({ name, label, required, className, ...props }) => {
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
				<Textarea className='h-12 text-base' {...register(name)} {...props}/>
				{value && <ClearButton onClickClearButton={onClickClear} />}
			</div>

			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	)
}