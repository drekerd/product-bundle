const Products = require('../models/productModel')

// of this is a oversimplified way to get recommendations.
// I am using a list of categories , and if it finds any product matching that category the product will be retuned
// For more reliable and better recommandations, we could use more complex approaches
// We could use if we have access, user data to see what products are more common to be bought with th eselected product
// Also based on categories, we could have a list of the most products bought base on those categories
// Here i also have couple of products, so every product will be used.
// If i would have 1000 products it would return them all
// We could send only the two or three most bought, or with better avaliation, matching a category or a common purchase
exports.getProductRecommendations = async (id) => {
    console.log(`get product recommendations for product id ${id}`)
    const product = await Products.findById(id)
    const matchCategories = product.recommendedBundleCategories
    const matchProducts = await Products.find({category: {$in: matchCategories}})
    console.log(`get product recommendations for product id ${id} with ${matchProducts}`)

    return matchProducts
}