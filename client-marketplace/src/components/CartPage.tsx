import { useCart, useCartQuantity } from "../stores/cartStore";
import { DELIVERY_PRICES } from "../types";

export default function Cart() {
  const cart = useCart();
  const cartQuantity = useCartQuantity();

  const formatPrice = (priceCents: number) => {
    return (priceCents / 100).toFixed(2);
  };

  const getSubtotalCents = () => {
    return cart.reduce((a, e) => a + e.quantity * e.product.priceCents, 0);
  };

  const getShippingCents = () => {
    return cart.reduce((a, e) => a + DELIVERY_PRICES[e.deliveryType], 0);
  };

  const getTaxCents = () => {
    return Math.round(getSubtotalCents() * 0.1);
  };

  const getOrderTotalCents = () => {
    return getSubtotalCents() + getShippingCents() + getTaxCents();
  };

  const subtotal = formatPrice(getSubtotalCents());
  const shipping = formatPrice(getShippingCents());
  const totalBeforeTax = formatPrice(getSubtotalCents() + getShippingCents());
  const tax = formatPrice(getTaxCents());
  const total = formatPrice(getOrderTotalCents());

  return (
    <div style={{ paddingTop: "48px" }}>
      <div>
        <ol>
          {cart.map((e) => (
            <li>
              {e.product.name}, {e.quantity}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h3>Order Summary</h3>
        <p>
          Items ({cartQuantity}): ${subtotal}
        </p>
        <p>Shipping & handling: ${shipping}</p>
        <p>Total before tax: ${totalBeforeTax}</p>
        <p>Estimated tax (10%): ${tax}</p>
        <p>
          <strong>Order total: ${total}</strong>
        </p>
      </div>
    </div>
  );
}
