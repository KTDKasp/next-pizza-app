'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, FormRegisterValues } from './modals/forms/schemas';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { Title } from './title';
import { FormInput } from './form-components';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';

type ProfileFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
	data: User;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ data }) => {
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: '',
			confirmPassword: '',
		}
	})

	const onSubmitForm = async (data: FormRegisterValues) => {
		try {
			await updateUserInfo({
				email: data.email,
				fullName: data.fullName,
				password: data.password
			}) 

			toast.success('Профиль успешно обновлен!', {
				icon: '✅',
			})
		} catch (error) {
			return toast.error('Ошибка при обновлении профиля', {
				icon: '❌',
			})
		}
	}

	const onClickSignOut = () => {
		signOut({
			callbackUrl: '/'
		});
	};

	return (
		<Container className="my-10">
      <Title text={`Личные данные | #${data.id}`} size="md" className="font-bold" />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmitForm)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput type="password" name="password" label="Новый пароль" required />
          <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button">
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
	)
}