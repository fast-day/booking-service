import { useOrderStore } from "../store/order.store";

export const useOrderState = () => {
  return useOrderStore();
}
