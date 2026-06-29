import { Schema, model } from "mongoose";

const cartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    deliveryType: { type: String, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    items: [cartItemSchema],
    orderDate: { type: Date, required: true, default: Date.now },
  },
  { _id: false },
);

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  orders: [orderSchema],
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...rest } = returnedObject;
    return { id: _id.toString(), ...rest };
  },
});

export default model("User", userSchema);
