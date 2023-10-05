
import {getProductCategories} from "./modules/model/dummyjasonLib.js";


let categoriesDisplayElement='categoriesNav';
let productDisplayElement='productDisplay';

initApp();



function initApp(){
// just to get things started ... happy coding :)

    getProductCategories().then((categories)=>{
      
       console.log(categories);
            // Call the categories callback if available
            if (window._viewCallBacks && window._viewCallBacks.categoriesCallBack) {
            window._viewCallBacks.categoriesCallBack(categories);
        }
    })
    .catch((error) => {
        // Handle errors
        console.error("Error fetching categories:", error);
        // Log the error and handle it as needed

    });
    
}

function categoriesCallBack(categories) {
    // Handle categories data here
    console.log("Categories callback:", categories);

    // Get the categoriesNav element from the DOM
    const categoriesNavElement = document.getElementById('categoriesNav');

    // Check if the element exists
    if (categoriesNavElement) {
        // Clear existing content in the element
        categoriesNavElement.innerHTML = '';

        // Create links for each category and append to the navigation bar
        categories.forEach(category => {
            const categoryLink = document.createElement('a');
            categoryLink.href = '#'; // Set the link URL if needed
            categoryLink.textContent = category;
            categoryLink.addEventListener('click', (event) => {
                event.preventDefault();
                // Handle click event for the category link
                // For example, fetch products for the selected category and display images
                fetchProductsByCategory(category);
            });

            const listItem = document.createElement('li');
            listItem.appendChild(categoryLink);
            categoriesNavElement.appendChild(listItem);
        });
    } else {
        console.error('Element with ID "categoriesNav" not found.');
    }
}

function fetchProductsByCategory(category) {
    // Assuming you have an API endpoint to fetch products by category
    // Replace '/api/products?category=' with your actual API endpoint
    fetch(`https://dummyjson.com/products/category/${category}`)
        .then(response => response.json())
        .then(products => {
            // Call the function to display products/images
            displayProducts(products);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            // Handle error as needed
        });
}

// Define a basket array to store products
const basket = [];


function displayProducts(response) {
    const products = response.products;
    const displayedImages = {}; // Use an object to track displayed images for each category

    // Assuming productDisplayElement is the container where you want to display products
    const productDisplayElement = document.getElementById('productDisplay');

    // Clear existing content
    productDisplayElement.innerHTML = '';

    // Check if products is an array
    if (Array.isArray(products)) {
        // Iterate through products and create product elements
        products.forEach(product => {
            const category = product.category; // Assuming there's a category property in your product data
            displayedImages[category] = displayedImages[category] || 0;

            // Limit the number of displayed images to 3 per category
            if (displayedImages[category] < 3) {
                // Create a container div for the product
                const productContainer = document.createElement('div');
                productContainer.classList.add('product-container'); // Add a class for styling

                // Create product image element
                const productImage = document.createElement('img');
                productImage.src = product.images[0]; // Assuming the first image URL from the product data
                productImage.alt = product.title; // Set alt text for accessibility

                // Create a div for product information
                const productInfoDiv = document.createElement('div');
                productInfoDiv.classList.add('product-info');

                // Create product title element
                const productName = document.createElement('h2');
                productName.textContent = product.title; // Assuming product title property

                // Create product description element
                const productDescription = document.createElement('p');
                productDescription.textContent = product.description; // Assuming product description property

                // Create product price element
                const productPrice = document.createElement('p');
                productPrice.textContent = `Price: DKK ${product.price}`; // Assuming product price property

                // Create buy button
                const buyButton = document.createElement('button');
                buyButton.textContent = 'Køb'; // Text for the buy button
                let quantity = 0; // Initialize quantity to 0
                const productIndex = basket.findIndex(item => item.product.title === product.title);
                if (productIndex !== -1) {
                    // If the product is in the basket, get its quantity
                    quantity = basket[productIndex].quantity + 1;
                }

                buyButton.addEventListener('click', () => {
                    // Check if the product is already in the basket
                    const productIndex = basket.findIndex(item => item.product.title === product.title);
                    
                    if (productIndex !== -1) {
                        // If the product is in the basket, update its quantity
                        basket[productIndex].quantity++;
                    } else {
                        // If the product is not in the basket, add it with quantity 1
                        basket.push({ product, quantity: 1 });
                    }
                
                    // Update the cart badge and cart items display
                    updateCartBadge();
                    updateCartDisplay();
                
                    // Change button text and disable it when clicked
                    buyButton.textContent = 'Lagt i kurv';
                    buyButton.disabled = false;
                    buyButton.style.color = 'green'; // Set text color to green
                
                    console.log(`Added ${product.title} to cart`);
                });

                // Get cart elements from the DOM
                const cartBadge = document.getElementById('cartBadge');
                const cartItemsElement = document.getElementById('cartItems');
                const cartButton = document.getElementById('cartButton');


                // Update the cart badge with the total number of items in the cart
                function updateCartBadge() {
                    const totalItems = basket.reduce((acc, item) => acc + item.quantity, 0);
                    cartBadge.textContent = totalItems;
                }

                cartButton.addEventListener('click', () => {
                    // Toggle the 'hidden' class on cartItemsElement
                    cartItemsElement.classList.toggle('hidden');

                    // If cart is visible, update the cart content
                    if (!cartItemsElement.classList.contains('hidden')) {
                        // Clear existing content in the cart items element
                        cartItemsElement.innerHTML = '';

                        // Iterate through the basket and add items to the cart
                        basket.forEach(item => {
                            const cartItem = document.createElement('div');
                            cartItem.textContent = `${item.product.title} - Antal: ${item.quantity}`;
                            cartItemsElement.appendChild(cartItem);
                        });
                    }
                });
                // Close cart by clicking outside or clearing cart
                function addToCart(product, quantityToAdd) {
                    // Find the product in the basket
                    const productIndex = basket.findIndex(item => item.product.title === product.title);
                
                    // If the product is in the basket, update its quantity by adding the new quantity
                    if (productIndex !== -1) {
                        basket[productIndex].quantity += quantityToAdd;
                    } else {
                        // If the product is not in the basket, add it with the specified quantity
                        basket.push({ product, quantity: quantityToAdd });
                    }
                
                    // Update the cart badge and cart items display
                    updateCartBadge();
                    updateCartDisplay();
                }
                
                function updateCartDisplay() {
                    const cartItemsElement = document.getElementById('cartItems');
                    cartItemsElement.innerHTML = ''; // Clear existing content

                    let totalPrice = 0; // Initialize total price
    
                
                    // Iterate through the basket and add items to the cart
                    basket.forEach(item => {
                        const cartItem = document.createElement('div');
                        cartItem.textContent = `${item.product.title} - Antal: ${item.quantity}`;
                        cartItemsElement.appendChild(cartItem);

                                // Add item price to total price
                        totalPrice += item.product.price * item.quantity;
                    });

                        // Display total price at the end of the cart items
                        const totalItem = document.createElement('div');
                        totalItem.textContent = `Total Price: DKK ${totalPrice.toFixed(2)}`;
                        totalItem.style.fontWeight = 'bold'; // Set the font weight to bold
                        cartItemsElement.appendChild(totalItem);
                }

                const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

                addToCartButtons.forEach(button => {
                    button.addEventListener('click', event => {
                        event.preventDefault(); // Prevent the default button behavior
                        const productTitle = button.dataset.title; // Assuming product title is stored in a data attribute
                        const product = products.find(product => product.title === productTitle);
                
                        // Check if the button is disabled
                        if (!button.disabled) {
                            addToCart(product); // Add the product to the cart
                            button.disabled = true; // Disable the button to prevent multiple clicks
                            button.textContent = 'Lagt i kurv'; // Change button text
                            button.style.color = 'green'; // Set text color to green
                        }
                    });
                });

                
                // Append elements to the product info div
                productInfoDiv.appendChild(productName);
                productInfoDiv.appendChild(productDescription);
                productInfoDiv.appendChild(productPrice);
                productInfoDiv.appendChild(buyButton); // Append the buy button

                // Append product image and info div to the product container
                productContainer.appendChild(productImage);
                productContainer.appendChild(productInfoDiv);

                // Append the product container to the product display element
                productDisplayElement.appendChild(productContainer);

                displayedImages[category]++; // Increment the count of displayed images for the category
            }
        });
    } else {
        console.error('Invalid response format:', response);
        // Handle the error or inform the user that the data is not in the expected format
    }
}



function getAllProducts(myLimit, mySkip) {
    return new Promise((resolve, reject) => {
        // Validate myLimit and mySkip
        if (!Number.isInteger(myLimit) || !Number.isInteger(mySkip) || myLimit <= 0 || mySkip < 0) {
            const error = new Error("Invalid limit or skip values");
            console.error(error);
            reject(error);
        } else {
            // Simulate an asynchronous API call to fetch products
            setTimeout(() => {
                // Fetch products based on myLimit and mySkip logic
                // For example, use an API call like fetch(`/api/products?limit=${myLimit}&skip=${mySkip}`)
                // Simulated response data
                const products = []; // Store fetched products here

                // Resolve the promise with the fetched products
                resolve(products);
            }, 1000); // Simulating a delay of 1 second for the API call
        }
    });
}


function productCardCallback(productData) {
    // Handle product data here
    console.log("Product card callback:", productData);
}

// Example usage of getAllProducts function
const myLimit = 20;
const mySkip = 20;

getAllProducts(myLimit, mySkip)
    .then((products) => {
        console.log("Fetched products:", products);
        // Call the callback function with the fetched products
        productCardCallback(products);
    })
    .catch((error) => {
        // Handle errors here
        console.error("Error fetching products:", error);
        // Log the error and handle it as needed
    });




    
// Store the callbacks in the window object
window._viewCallBacks = { categoriesCallBack, productCardCallback };


// callBack functions remember hoisting to window eks: window._viewCallBacks = { categoriesCallBack,productCardCallback};

