const ProductController = require("../../controllers/productController");
const ProductModel = require("../../models/productModel");
const httpMocks = require("node-mocks-http")
const getAllProductsResponse = require("../mock-data/productController/get_all_products_response_mock.json")
const getAllProductsFromDB = require("../mock-data/productController/get_all_products_mock_from_DB.json")
const getProductResponse = require("../mock-data/productController/get_product_by_id_response_mock.json")
const getProductFromDB = require("../mock-data/productController/get_product_by_id_mock_from_DB.json")

ProductModel.find = jest.fn();
ProductModel.findById = jest.fn();

let req, res;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
})

describe('ProductController -> get all products', () => {
    it('should call productModel.find method', async () => {
        await ProductController.getAllProducts(req, res);
        expect(ProductModel.find).toBeCalled();
    })
    it('should return a response with 200 and response body', async () => {
        ProductModel.find.mockReturnValue(getAllProductsFromDB);
        await ProductController.getAllProducts(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(getAllProductsResponse);
    })
})

describe('ProductController -> get product by id', () => {
    it('should call productModel.findById method', async () => {
        await ProductController.getProduct(req, res);
        expect(ProductModel.findById).toBeCalled();
    })
    it('should call productModel.findById method with request params', async () => {
        req.params.id="60c08b33783aaeba34e29dfe"
        await ProductController.getProduct(req, res);
        expect(ProductModel.findById).toBeCalledWith("60c08b33783aaeba34e29dfe");
    })
    it('should return a response with 200 and response body', async () => {
        ProductModel.findById.mockReturnValue(getProductFromDB);
        await ProductController.getProduct(req, res);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual(getProductResponse);
    })
})