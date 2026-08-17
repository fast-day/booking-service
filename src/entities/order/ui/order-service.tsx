import type { IOrderSelectService } from "../model/types/order.types"

export const OrderService = ({ name, price }: IOrderSelectService) => {
  return (
    <div className="border-t border-b border-border">
      
      <div className="py-5 grid gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold leading-5">{name}</h3>
          <p className="text-md font-medium leading-3">{price} ₽</p>
        </div>
        <div className="text-sm leading-3 opacity-80">1 ч. 30 мин.</div>
      </div>
    
    </div>
  )
}
