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

export type ProductCartInfo = Omit<Product, "rating">;

export type DeliveryType = "PickUp" | "NormalDoorstep" | "FastDoorstep";

export interface CartItem {
  product: ProductCartInfo;
  quantity: number;
  deliveryType: DeliveryType;
}

export interface Order {
  items: CartItem[];
  orderDate: string;
}

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  orders: Order[];
}

export interface UserCredentials {
  username: string;
  password: string;
}
