import { cn } from '@/lib/utils';

interface Props {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, className }) => {
  return <img className={cn('w-[65px] h-[65px]', className)} src={src} alt='Product Image'/>;
};
