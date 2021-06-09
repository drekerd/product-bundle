const ProductModel = require("../../models/productModel")
const RecommendationModel = require("../../models/recommendationModel");
const getProductFromDB = require("../mock-data/productController/get_product_by_id_mock_from_DB.json")
const getRecommnedtaionsObject = require("../mock-data/recommnedationModel/recommendations_object.json")

ProductModel.find = jest.fn();
ProductModel.findById = jest.fn();

describe('RecommendationController -> get all products', () => {
    it('should call product find and findById', async () => {
        const id = "60c08b33783aaeba34e29dfe"
        
        ProductModel.findById.mockReturnValue(getProductFromDB);
        ProductModel.find.mockReturnValue(getRecommnedtaionsObject);

        await RecommendationModel.getProductRecommendations(id);

        expect(ProductModel.find).toBeCalled();
        expect(ProductModel.findById).toBeCalled();
    })

    it('should should return an object with recommendations', async () => {
        const id = "60c08b33783aaeba34e29dfe"

        ProductModel.findById.mockReturnValue(getProductFromDB);
        ProductModel.find.mockReturnValue(getRecommnedtaionsObject);

        const recommnedationReturn = await RecommendationModel.getProductRecommendations(id)

        expect(recommnedationReturn).toEqual(getRecommnedtaionsObject);
    })
})