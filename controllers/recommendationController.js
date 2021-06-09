const Products = require('../models/productModel')
const Recommendation = require('../models/recommendationModel')

exports.getProductRecommendation = async (request, response) => {
    try {

        const recommendations = await Recommendation.getProductRecommendations(request.params.id)
        response
            .status(200)
            .json({
                status: 'success',
                data: {
                    recommendations
                }
            })
    } catch (err) {
        response.status(400).json({
            status: 'fail',
            message: err
        })
    }
}
