const express = require('express');
const recommendationsController = require('../controllers/recommendationController')
const router = express.Router();


router.route('/:id')
    .get(recommendationsController.getProductRecommendation);
module.exports = router;
