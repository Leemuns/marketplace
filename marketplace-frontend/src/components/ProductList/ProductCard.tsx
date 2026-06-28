import { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import IconButton from "@mui/material/IconButton";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import type { Product } from "../../types";
import { useCartActions } from "../../stores/cartStore";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const cartActions = useCartActions();

  const open = Boolean(anchorEl);
  const popperId = open ? `popper-${product.id}` : undefined;

  const handleTogglePopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    setQuantity(isNaN(val) || val < 1 ? 1 : val);
  };

  const handleAddToCart = () => {
    cartActions.addProduct(product, quantity);
    setAnchorEl(null);
  };

  return (
    <Card sx={{ height: "300px" }}>
      {noImageIcon()}
      <CardContent
        sx={{
          height: "100px",
          display: "flex",
          flexDirection: "column",
          p: 1.5,
        }}
      >
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          sx={{ fontSize: "14px" }}
        >
          {truncateText(product.name, 32)}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          RM{(product.priceCents / 100).toFixed(2).toString()}
        </Typography>

        <Box
          sx={{
            mt: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating
              name={`rating-${product.id}`}
              value={product.rating.stars}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography
              variant="caption"
              sx={{ ml: 1, color: "text.secondary" }}
            >
              ({product.rating.stars.toFixed(1)})
            </Typography>
          </Box>

          <IconButton
            size="small"
            onClick={handleTogglePopper}
            aria-describedby={popperId}
            sx={{ color: "text.secondary" }}
          >
            <AddShoppingCartIcon fontSize="small" />
          </IconButton>
        </Box>

        <Popper
          id={popperId}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          sx={{ zIndex: 1300 }}
        >
          <Box
            sx={{
              p: 1.5,
              bgcolor: "background.paper",
              boxShadow: 3,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              minWidth: 180,
            }}
          >
            <TextField
              type="number"
              size="small"
              value={quantity}
              onChange={handleQuantityChange}
              sx={{ width: 80 }}
            />
            <Button variant="contained" size="small" onClick={handleAddToCart}>
              Add
            </Button>
          </Box>
        </Popper>
      </CardContent>
    </Card>
  );
}

function noImageIcon() {
  return (
    <CardMedia
      component="div"
      sx={{
        height: "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "action.hover",
        color: "text.disabled",
      }}
    >
      <ImageNotSupportedIcon sx={{ fontSize: 60 }} />
    </CardMedia>
  );
}

function truncateText(text: string, maxLength: number = 120): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
