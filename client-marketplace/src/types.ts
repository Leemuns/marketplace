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
