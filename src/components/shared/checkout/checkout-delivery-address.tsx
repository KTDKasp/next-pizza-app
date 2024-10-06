import { WhiteBlock } from '../white-block';
import { FormAddressInput, FormInput, FormTextarea } from '../form-components';

export const CheckoutDeliveryAddress: React.FC = () => {
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <FormInput
          name="address"
          className="text-base"
          placeholder="Введите адрес..."
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
