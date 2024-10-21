import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, FormLoginValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../title';
import { FormInput } from '../../form-components';
import { Button } from '@/components/ui';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

type LoginFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
	onCloseModal?: VoidFunction;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onCloseModal }) => {
	const form = useForm<FormLoginValues>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmitForm = async (data: FormLoginValues) => {
		try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!response?.ok) {
        throw new Error();
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });

      onCloseModal?.();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
	};

	return (
		<FormProvider {...form}>
			<form
				className="flex flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmitForm)}
			>
				<div className="flex justify-between items-center">
					<div className="mr-2">
						<Title text="Вход в аккаунт" size="md" className="font-bold" />
						<p className="text-gray-400">
							Введите свою почту, чтобы войти в свой аккаунт
						</p>
					</div>
					<img
						src="/images/numbers-icon.png"
						alt="phone-icon"
						width={60}
						height={60}
					/>
				</div>

				<FormInput name="email" label="E-Mail" required />
				<FormInput name="password" label="Пароль" type="password" required />

				<Button
					loading={form.formState.isSubmitting}
					className="h-12 text-base"
					type="submit"
				>
					Войти
				</Button>
			</form>
		</FormProvider>
	);
};
