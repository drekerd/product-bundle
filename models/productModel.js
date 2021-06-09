const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    secondCategory: String,
    recommendedBundleCategories: {
        type: Array,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;