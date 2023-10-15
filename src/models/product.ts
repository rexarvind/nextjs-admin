import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: mongoose.Types.ObjectId, ref: 'Category', required: false },
    images: [{ type: String }],
});

export const Product = models?.Product || model('Product', ProductSchema);

