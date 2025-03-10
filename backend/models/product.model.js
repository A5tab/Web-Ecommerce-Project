import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Product title is required'],
            trim: true,
            maxlength: [100, 'Product title must not exceed 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            maxlength: [1000, 'Description must not exceed 1000 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price must be greater than or equal to 0'],
        },
        mainImage: {
            type: String,
            required: [true, 'Main product image is required'],
        },
        images: {
            type: [String],
            required: [true, 'At least one product image is required'],
        },
        reviews: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                comment: { type: String, required: true },
                rating: { type: Number, min: 1, max: 5 },
            },
        ],
        rating: {
            type: Number,
            default: 0,
            min: [0, 'Rating must be greater than or equal to 0'],
            max: [5, 'Rating must not exceed 5'],
        },
        features: {
            type: [String],
        },
        stock: {
            type: Number,
            required: [true, 'Stock quantity is required'],
            min: [0, 'Stock must be greater than or equal to 0'],
        },
        category: {
            type: String,
            required: [true, 'Product category is required'],
        },
        paddleProductId: {
            type: String,
        },
        paddlePriceId: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

productSchema.index({ title: 'text', description: 'text' });
export default mongoose.model('Product', productSchema);
