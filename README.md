Product Storefront

This project is a simple storefront application that fetches product data from a fake store API, displays products, allows filtering, pagination, and cart functionality.
Features

    Product Display:
        Fetches product data from Fake Store API.
        Displays products in a card format with image, title, price, and buttons to add to cart or view details.

    Filtering:
        Filter products by title, minimum price, maximum price, and category.

    Pagination:
        Displays products with pagination, showing 4 products per page.

    Cart Functionality:
        Allows adding and removing products from the cart.
        Displays the total quantity and price of products in the cart.

Installation

    Clone the repository:

    bash

    git clone https://github.com/your-username/product-storefront.git
    cd product-storefront

    Open the index.html file in your web browser.

Usage
Filtering Products

    Use the filter form to search for products by title, minimum price, maximum price, and category.
    Click the "Filter" button to apply the filters.

Pagination

    Navigate through pages using the page buttons at the bottom of the product list.
    Click on a page number to view products on that page.

Viewing Product Details

    Click the "View Details" button on a product card to view more information about the product.

Adding to Cart

    Click the "Add to Cart" button on a product card to add the product to your shopping cart.
    View the cart details, including total quantity and price, in the cart section.

Removing from Cart

    Click the "Remove" button next to a product in the cart to remove it.
    The total quantity and price will be updated accordingly.

Code Explanation
API Fetching Data

Fetches product data from the API and displays it on the page:

javascript

try {
    const response = await fetch(ApiUrl);
    if (!response.ok) {
        throw new Error('Error');
    }
    const data = await response.json();
    products_array = data;
    productsDisplay(products_array);
} catch (error) {
    throw error;
}

Displaying Products

Displays products on the page with pagination:

javascript

async function productsDisplay(Products) {
    // code to display products
}

Filtering Products

Filters products based on user input:

javascript

filterForm.addEventListener('submit', function(event) {
    // code to filter products
});

Cart Functionality

Adds and removes products from the cart and updates the display:

javascript

function call_Cart() {
    // code to handle cart functionality
}

Contributing

    Fork the repository.
    Create a new branch.
    Make your changes.
    Submit a pull request.
