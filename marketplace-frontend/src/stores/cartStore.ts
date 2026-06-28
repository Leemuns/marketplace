import { create } from "zustand";
import type { CartItem, DeliveryType, Product } from "../types";

interface CartState {
  cart: CartItem[];
  actions: {
    addProduct: (
      product: Product,
      quantity?: number,
      deliveryType?: DeliveryType,
    ) => void;
    removeProduct: (product: Product, quantity?: number) => void;
  };
}

const useCartStore = create<CartState>((set, get) => {
  const addProduct: CartState["actions"]["addProduct"] = (
    product,
    quantity = 1,
    deliveryType = "PickUp",
  ) => {
    const matchedItem = get().cart.find((e) => e.product.id === product.id);
    if (matchedItem) {
      matchedItem.quantity += quantity;
      return set((state) => ({
        cart: state.cart.map((e) =>
          e.product.id === matchedItem.product.id ? matchedItem : e,
        ),
      }));
    }

    set((state) => ({
      cart: state.cart.concat({ product, quantity, deliveryType }),
    }));
  };

  const removeProduct: CartState["actions"]["addProduct"] = (
    product,
    quantity = 1,
  ) => {
    const matchedItem = get().cart.find((e) => e.product.id === product.id);
    if (!matchedItem) {
      throw new Error(
        "Unable to remove product from cart due to non-existing product id",
      );
    }

    matchedItem.quantity -= quantity;
    if (matchedItem.quantity < 0) {
      return set((state) => ({
        cart: state.cart.filter((e) => e.product.id === product.id),
      }));
    }

    return set((state) => ({
      cart: state.cart.map((e) =>
        e.product.id === matchedItem.product.id ? matchedItem : e,
      ),
    }));
  };

  return {
    cart: [],
    actions: {
      addProduct,
      removeProduct,
    },
  };
});

export default useCartStore;

export const useCart = () => useCartStore((state) => state.cart);
export const useCartQuantity = () => {
  const cart = useCartStore((state) => state.cart);
  return cart.reduce((a, e) => a + e.quantity, 0);
};
export const useCartActions = () => useCartStore((state) => state.actions);
