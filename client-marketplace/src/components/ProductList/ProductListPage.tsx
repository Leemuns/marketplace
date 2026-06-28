import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";

export default function ProductListPage() {
  const { products, isPending, isError } = useProducts();

  if (isPending) {
    return <div>Loading data...</div>;
  }

  if (isError) {
    return <div>Product service not available due to problems in server</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2, pt: 9.5 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid size={{ lg: 2, md: 3, sm: 6 }} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
