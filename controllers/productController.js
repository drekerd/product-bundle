const Products = require('../models/productModel')

exports.getAllProducts = async (request, response) => {
    try {
        const products = await Products.find();
        response
            .status(200)
            .json({
                status: 'success',
                results: products.length,
                data: {
                    products
                }
            })
    } catch (err) {
        response.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getProduct = async (request, response) => {
    try {
        console.log(request.params.id)
        const product = await Products.findById(request.params.id)
        response
            .status(200)
            .json({
                status: 'success',
                data: {
                    product
                }
            })
    } catch (err) {
        response.status(404).json({
            status: 'fail',
            message: err
        })
    }
}