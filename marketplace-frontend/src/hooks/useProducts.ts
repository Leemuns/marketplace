import { useQuery } from "@tanstack/react-query";
import productService from "../services/products";

export const useProducts = () => {
  const result = useQuery({
    queryKey: ["products"],
    queryFn: productService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    products: result.data ? result.data : [],
    isPending: result.isPending,
    isError: result.isError,
  };
};
