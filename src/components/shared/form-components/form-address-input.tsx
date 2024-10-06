'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface FormAddressInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	onChangeAddress?: (value?: string) => void;
}

export const FormAddressInput: React.FC<FormAddressInputProps> = ({
	onChangeAddress
}) => {
	return (
		<AddressSuggestions
			token="c0b0b6759bb6f1fc3d0090e0ef4844c78b46bad7"
			onChange={(data) => onChangeAddress?.(data?.value)}
		/>
	);
};
