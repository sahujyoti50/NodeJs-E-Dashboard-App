const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name: String,
    category: String,
    price: String,
    userId: String,
    company: String
});
module.exports = mongoose.model('products', productSchema);