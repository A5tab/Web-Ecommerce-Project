import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true,
            unique: true,
            index: true
        },
        fullName: {
            type: String,
            required: [true, 'Full Name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        role: {
            type: String,
            enum: ['user', 'admin'], // only from these two
            default: 'user',
        },
        cart: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1, 'Quantity must be at least 1'],
                },
            },
        ],
        avatar: {
            type: String,
        },
        refreshToken: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', userSchema);