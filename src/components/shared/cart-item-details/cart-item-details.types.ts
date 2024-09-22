export interface CartItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  details: string;
  disabled?: boolean;
}
