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
