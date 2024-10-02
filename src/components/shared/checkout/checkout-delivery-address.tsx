import { Input, Textarea } from '@/components/ui';
import { WhiteBlock } from '../white-block';

export const CheckoutDeliveryAddress: React.FC = () => {
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Input
          name="address"
          className="text-base"
          placeholder="Введите адрес..."
        />
        <Textarea
          className="text-base"
          placeholder="Комментарии к заказу..."
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
