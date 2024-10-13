'use client';

import { WhiteBlock } from '../white-block';
import { FormAddressInput, FormTextarea } from '../form-components';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const CheckoutDeliveryAddress: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller 
          control={control}
          name='address'
          render={({ field, fieldState }) => (
            <>
              <FormAddressInput onChangeAddress={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />
        
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарии к заказу..."
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
