
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

// function displayProducts(response) {
//     const products = response.products;
//     const displayedImages = {}; // Use an object to track displayed images for each category

//     // Assuming productDisplayElement is the container where you want to display products
//     const productDisplayElement = document.getElementById('productDisplay');

//     // Clear existing content
//     productDisplayElement.innerHTML = '';

//     // Check if products is an array
//     if (Array.isArray(products)) {
//         // Iterate through products and create product elements
//         products.forEach(product => {
//             const category = product.category; // Assuming there's a category property in your product data
//             displayedImages[category] = displayedImages[category] || 0;

//             // Limit the number of displayed images to 3 per category
//             if (displayedImages[category] < 3) {
//                 // Create a container div for the product
//                 const productContainer = document.createElement('div');
//                 productContainer.classList.add('product-container'); // Add a class for styling

//                 // Create product image element
//                 const productImage = document.createElement('img');
//                 productImage.src = product.images[0]; // Assuming the first image URL from the product data
//                 productImage.alt = product.title; // Set alt text for accessibility

//                 // Create a div for product information
//                 const productInfoDiv = document.createElement('div');
//                 productInfoDiv.classList.add('product-info');

//                 // Create product title element
//                 const productName = document.createElement('h2');
//                 productName.textContent = product.title; // Assuming product title property

//                 // Create product description element
//                 const productDescription = document.createElement('p');
//                 productDescription.textContent = product.description; // Assuming product description property

//                 // Create product price element
//                 const productPrice = document.createElement('p');
//                 productPrice.textContent = `Price: DKK ${product.price}`; // Assuming product price property

//                 // Append elements to the product info div
//                 productInfoDiv.appendChild(productName);
//                 productInfoDiv.appendChild(productDescription);
//                 productInfoDiv.appendChild(productPrice);

//                 // Append product image and info div to the product container
//                 productContainer.appendChild(productImage);
//                 productContainer.appendChild(productInfoDiv);

//                 // Append the product container to the product display element
//                 productDisplayElement.appendChild(productContainer);

//                 displayedImages[category]++; // Increment the count of displayed images for the category
//             }
//         });
//     } else {
//         console.error('Invalid response format:', response);
//         // Handle the error or inform the user that the data is not in the expected format
//     }
// }

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
                buyButton.addEventListener('click', () => {
                    // Change button text and disable it when clicked
                    buyButton.textContent = 'Lagt i kurv';
                    buyButton.disabled = true;

                    // Add functionality for further actions like adding to cart or redirecting to checkout
                    // For example, you can add the product to a shopping cart here
                    console.log(`Added ${product.title} to cart`);
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

