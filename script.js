const productContainer =
document.getElementById("productContainer");

async function fetchProducts() {

    const url = "https://fakestoreapi.com/products";

    try {

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        displayProducts(products);

    }

    catch(error) {

        productContainer.innerHTML =
        `<p>${error.message}</p>`;
    }
}

function displayProducts(products) {

    productContainer.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.classList.add("product-card");

        card.innerHTML = `

            <img src="${product.image}" alt="${product.title}">

            <h3>${product.title}</h3>

            <p>$${product.price}</p>

            <p>${product.category}</p>

            <button>Add to Cart</button>
        `;

        productContainer.appendChild(card);
    });
}

fetchProducts();
