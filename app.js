const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const recommendations = require('./controllers/recommendationController');


const app = express();
const productRouter = require('./routes/productRoutes');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')))

//Using server-side rendering with pug to simplify,
//but of course rendered pages should be abstracted on a client-side
app.set('views', path.join(__dirname, 'views'));

dotenv.config({ path: path.join(__dirname, 'config.env') });

const V1_API = process.env.API_GATEWAY_V1
console.log(process.env.API_GATEWAY_V1)

// app.use((request, response, next) => {
//     console.log('New incoming request')
//     console.log('Request URL:', request.originalUrl)
//     next()
// })

//FE Routes
app.get('/products', (request, response) => {
    response
        .status(200)
        .sendFile(path.join(__dirname, './views/home.html'))
})

app.get('/products/:id', (request, response) => {
    response
        .status(200)
        .sendFile(path.join(__dirname, './views/singleProduct.html'))
})

// Api Routes
// Ofc a properly herror handling should e done
app.use(`${V1_API}/products`, productRouter)
app.use(`${V1_API}/products/:id`, productRouter);

// A different way to do handle a request
app.get(`${V1_API}/recommendations/:id`, (request, response) => {
    recommendations.getProductRecommendation(request, response)
});

module.exports = app;