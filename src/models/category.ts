import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: 'Category', required: false, },
});

export const Category = models?.Category || model('Category', CategorySchema);

