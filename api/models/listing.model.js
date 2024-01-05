import mongoose, { Schema } from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    insurance: {
      type: Boolean,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    fuel: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
