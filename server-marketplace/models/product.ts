import { Schema, model } from "mongoose";

const ratingSchema = new Schema(
  {
    stars: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  { _id: false },
);

const productSchema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  priceCents: { type: Number, required: true },
  rating: { type: ratingSchema, required: true },
  keywords: { type: [String], default: [] },
});

productSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...rest } = returnedObject;
    return { id: _id, ...rest };
  },
});

export default model("Product", productSchema);
