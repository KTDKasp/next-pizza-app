import { mapPizzaType, PizzaSize, PizzaType } from "@/constants/pizza";
import { cn } from "@/lib/utils";
import { Ingredient } from "@prisma/client";

interface CartItemInfoProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  name: string;
  details: string;
}

export const CartItemInfo: React.FC<CartItemInfoProps> = ({ name, details, className, ...props }) => {


  return (
    <div {...props}>
      <div className={cn("flex items-center justify-between", className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      { details && <p className="text-xs text-gray-400 w-[90%]">{details}</p> }
    </div>
  );
};
