const xhr = new XMLHttpRequest();
const getAllProductsUrl = 'http://localhost:3000/api/v1/products'

window.onload = function(){
    getAllProductsData();
}

const getAllProductsData = () => {
    xhr.open('GET', getAllProductsUrl);
    xhr.send();
    xhr.onload = () =>{
        // no herror handling, it should be handled properly. for ex: Show a page with with a kind message based on status code
        if (xhr.status === 200) {
            let parsedResponse = JSON.parse(xhr.response)
            console.log(parsedResponse.data)
            const html = parsedResponse.data.products.map(product => {
                return `<div class="single-product-container">
                            <div>
                                <a class="single-product-card-name" href="http://localhost:3000/products/${product._id}">${product.name}
                            </div>
                            <div class="product-image-cotainer">
                                <a href="http://localhost:3000/products/${product._id}">
                                    <img class="product-image" src="${product.imagePath}" alt="">
                                </a>
                            </div>
                        </div>`;
            }).join("")
            document.querySelector(".products-container").insertAdjacentHTML("afterbegin", html)
        }
    }
}

