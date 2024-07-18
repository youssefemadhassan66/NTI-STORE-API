document.addEventListener('DOMContentLoaded', async function() {
    
            /*Api Url */
            const ApiUrl = "https://fakestoreapi.com/products";

            /*Filter Variables */
            const filterForm = document.getElementById("filter-form");
            const FilterSearchInput = document.getElementById("searchInput");
            const FilterMinPrice = document.getElementById("minPrice");
            const FilterMaxPrice  = document.getElementById("maxPrice"); 
            const FilterCategory = document.getElementById("categoryFilter");

            /*product Variables */
            const ProductsContent = document.getElementById("product-content");
            let products_array = [] ;

            /*Cart  Variables*/
            let cartQuantity = document.getElementById("total-quantity");
            let cart_price= document.getElementById("total-price");
            let cart_price_sum=0;
            let cart= [];

            /*Pages Variables */
            let numberOfPages = 1;
            let page_number_list = document.querySelector(".page-list");
            let currentPage_number= 1;
            
            
            /*Api  Fetching Data*/    
        
            try {
                const response = await fetch(ApiUrl);
                if(!response.ok){
                    throw new Error('Error');
                }
                const data = await response.json();
                products_array = data;
                productsDisplay(products_array);
            } catch (error) {
                throw error;
            }

        


            /*Displaying products */
            async function productsDisplay(Products){ 

                ProductsContent.innerHTML='';
                
                numberOfPages = Math.ceil(Products.length / 4);
                
                pageDisplay(numberOfPages,Products);

                let start = (currentPage_number-1) * 4;
                let end = start + 4;

                let Products_for_each_page = Products.slice(start,end);

                Products_for_each_page.forEach(Product => {
                    ProductsContent.innerHTML+= `
                    <div class="product-card">
                    <img src="${Product.image}">
                    <h3>${Product.title}</h3>
                    <p>Price$ <span id="product-price">${Product.price}</spn></p> 
                    <div class="Product-add-cart">
                    <button class="add-to-cart btn btn-primary" id="${Product.id}">Add to Cart</button>
                    <button class="view-details btn btn-primary" id="${Product.id}">View Details</button>
                    </div>
                    `
                });

                call_Cart();
                
            
            }
         


             /*Page number Display*/
             function pageDisplay(number,products) {
                page_number_list.innerHTML = "";
                for (let i = 1; i <= number; i++) {
                    let page_item = document.createElement("li");
                    page_item.innerHTML = `<button class="btn btn-outline-secondary page-number-btn" id="${i}">${i}</button>`;
                    page_number_list.appendChild(page_item);
                }
            
                let page_number_btn = document.querySelectorAll(".page-number-btn");
                /* Event listeners to pages buttons */
                page_number_btn.forEach(button => {
                    button.addEventListener('click', function(event) {
                        let currentPage = parseInt(event.target.id);
                        currentPage_number = currentPage;
                        productsDisplay(products);
                    });
                });
            }

            /* Display  1 product*/

            let viewDetails = document.querySelectorAll(".view-details");
           
            viewDetails.forEach(button => {
                button.addEventListener('click', function(event) {
                    let ItemId = event.target.id;
                    let item = products_array.find(Product => Product.id == ItemId);
                    ProductsContent.innerHTML ='';

                    ProductsContent.innerHTML+= `
                    <div class="product-card">
                    <img src="${item.image}">
                    <h3>${item.title}</h3>
                    <p>Price$ <span id="product-price">${item.price}</spn></p> 
                    <p>${item.description}</p>
                    <p>${item.category}</p>
                    <div class="Product-add-cart">
                    <button class="add-to-cart btn btn-primary" id="${item.id}">Add to Cart</button>
                    <p> Rating : ${item.rating.rate}</P>
                    </div>
                    `
                });
            });  
        


            filterForm.addEventListener('submit', function(event) {
                event.preventDefault();
                let title = FilterSearchInput.value.trim().toLowerCase();
                let minPrice = FilterMinPrice.value.trim();
                let maxPrice = FilterMaxPrice.value.trim();
                let selectedCategory = FilterCategory.value.toLowerCase();  
                
                let minPriceNumber = minPrice ? parseFloat(minPrice) : 0;
                let maxPriceNumber = maxPrice ? parseFloat(maxPrice) : 2000000000;

                    let filtered_Products   = products_array.filter(product => {
                    let isTitle    =  product.title.toLowerCase().includes(title);
                    let isMinPrice = product.price >= minPriceNumber;
                    let isMaxPrice = product.price <= maxPriceNumber;
                    let isCategory =  product.category.toLowerCase().includes(selectedCategory);
                    if(selectedCategory == 'all'){
                        return isTitle && isMinPrice && isMaxPrice;
                    }
                    return isTitle && isMinPrice && isMaxPrice && isCategory;
                });

                productsDisplay(filtered_Products);
                
            });

            /*Add to cart Function */
            const shoppingList = document.querySelector("#shopping-list");
            function call_Cart(){
            const addToCartBtn = document.querySelectorAll('.add-to-cart');
            addToCartBtn.forEach(product => {
                product.addEventListener('click', function(event) {
                    let find_product_id = event.target.id;
                    let selectedProduct = products_array.find(product => product.id == find_product_id);       
                    cart.push(selectedProduct);
                    Change_Cart_Display(cart);
                });
            });
        }
            function Change_Cart_Display(cart_display) {
                shoppingList.innerHTML = '';                    
                cart_price_sum = 0;
            
                cart_display.forEach(item => {

                    cart_price_sum += item.price;
                    let cartItem = document.createElement('li');
                    cartItem.innerHTML = `
                                         <span>${item.title}</span> - $<span>${item.price}</span>
                                          <button class="remove-item btn btn-danger" id="${item.id}">Remove</button>
                                         `;
                    shoppingList.appendChild(cartItem);
                });
            
                cart_price.innerHTML = `${cart_price_sum.toFixed(2)}`;
                cartQuantity.innerHTML = `${cart.length}`;   
            
                Remove_Item();
            }
            
            function Remove_Item() {
                const removeItemBtn = document.querySelectorAll('.remove-item');
                removeItemBtn.forEach(button => {
                    button.addEventListener('click', function(event) {
                        let find_product_id = event.target.id;    
                        let index = cart.findIndex(product => product.id == find_product_id);
                        cart.splice(index, 1);
                        Change_Cart_Display(cart);
                    });
                });
            }

            


            
                   
    
});





























