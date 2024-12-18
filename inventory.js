const prompt = require("prompt-sync")();
const prdct = require("./product");

let products = [];

let productCounter = 0;

function displayMenu() {
    console.log("-----------Main Menu-----------");
    console.log("    1. Add a product.");
    console.log("    2. Display all products.");
    console.log("    3. Modify a product.");
    console.log("    4. Delete a product.");
    console.log("    5. Quit");
}

function displayProduct(a)
{
    console.log("------------------------------------");
    console.log("name :" + products[a].name);
    console.log("descreption: " + products[a].descreption);
    console.log("quantity: " + products[a].quantity);
    console.log("price: " + products[a].price);
}

function displayProducts()
{
    for (let i = 0; i < products.length; i++) 
    {
        displayProduct(i);
    }
}


function add() 
{
    let addNumber = Number(prompt("How many products you wanna add ?"));

    for (let i = 0; i < addNumber-1; i++) 
    {
        let product = new prdct();

        product.name = prompt("name :");
        product.descreption = prompt("description :");
        product.quantity = prompt("quantity :");
        product.price = prompt("price :");

        products.push(product);
    }

    
}

function stockManager(){
    displayMenu();

    let menuOption = prompt("Enter your choice :");

    switch (menuOption) {
        case '1':
            add();
            break;
        case '2':
            displayProducts();
            break;
        default:
            break;
    }
}





