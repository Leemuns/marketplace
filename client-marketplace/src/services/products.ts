import type { Product } from "../types";

const baseUrl = "api/products";

const getAll = async (): Promise<Product[]> => {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
};

export default {
  getAll,
};
