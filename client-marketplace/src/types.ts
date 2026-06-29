export interface Product {
  id: string;
  name: string;
  image: string;
  priceCents: number;
  rating: {
    stars: number;
    count: number;
  };
}

export type DeliveryType = "PickUp" | "NormalDoorstep" | "FastDoorstep";

export const DELIVERY_PRICES: Record<DeliveryType, number> = {
  PickUp: 0,
  NormalDoorstep: 380,
  FastDoorstep: 780,
};

export interface CartItem {
  product: Product;
  quantity: number;
  deliveryType: DeliveryType;
}

export interface Order {
  items: CartItem[];
  orderDate: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  orders: Order[];
}
