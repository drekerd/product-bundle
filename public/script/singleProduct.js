const baseUrl = 'http://localhost:3000'
const getProductUrl = `${baseUrl}/api/v1/products/`
const getProductRecommendationsUrl = `${baseUrl}/api/v1/recommendations/`

window.onload = function(){
    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);
    loadData(id);
}

function loadData(id){
    getProductData(id);
    getProductRecommendations(id)
}

function getProductData(id) {
    request('GET', getProductUrl + id).then(request => {
        console.log(request)

        const product =  request.data.product
        document.querySelector(".product-image").src = baseUrl + product.imagePath
        document.querySelector(".product-name").innerText = product.name
        document.querySelector(".product-description p").innerText = product.description
        document.querySelector(".product-price span").innerText = product.price + '€'
    })
}

function getProductRecommendations(id) {
    request('GET', getProductRecommendationsUrl + id).then(request => {
        console.log(request)
        const html = request.data.recommendations.map((productRecommendation, index) => {
            console.log(productRecommendation)
            return `
                    <div class="recommendation product-${index}">
                        <img class="recommendation-product-image" src="${productRecommendation.imagePath}" alt="">
                        <div class="recommendation-product-details-and-price">
                            <a href="${baseUrl}/products/${productRecommendation._id}">
                                <div class="recommendation-product-details">
                                    <div class="recommendation-product-name">${productRecommendation.name}</div>
                                    <div class="recommendation-product-price">${productRecommendation.price}€</div>
                                </div>
                            </a>
                            <div class="recommendation-add-to-cart">
                                <a href="#" class="cart-btn">Add to cart</a>
                            </div>
                        </div>
                        
                    </div>`;
        }).join("")
        document.querySelector(".recommendations").insertAdjacentHTML("afterbegin", html)
    })
}

function request(method, url){
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.send();
        xhr.onload = async () =>{
            if(xhr.status === 200){
                resolve(JSON.parse(xhr.response))
            }
        };
    });
    return promise;
}