import { WhiteBlock } from '../white-block';
import { FormAddressInput, FormInput, FormTextarea } from '../form-components';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

export const CheckoutDeliveryAddress: React.FC = () => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адрес доставки">
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
        <FormAddressInput />
        
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
