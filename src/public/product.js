fetch('products/api/products')
.then((response) => response.json())
.then((data) => {
    const productContainer = document.querySelector('#product-container');
    data.producto.forEach((product) => {
        const productItem = document.createElement('li');
        productItem.innerHTML = `${product.title}, ${product.category}, ${product.price}, ${product.stock}, {product.thumbnail}`;

        const buyButton = document.createElement('button');
        buyButton.innerHTML = 'Comprar';
    })
})
.catch((error) => {
    console.log('Error fetching products:', error);

});