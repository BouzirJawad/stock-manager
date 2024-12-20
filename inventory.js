const fs = require('fs');
const prompt = require("prompt-sync")();
const prdct = require("./product");
const filePath = './stock manager/inventory.json';

class inverntory {
    products = [];

    constructor() {
        if(fs.existsSync(filePath)){
            this.products = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        }
    }
    
    saveProducts(){
        fs.writeFileSync(filePath, JSON.stringify(this.products, null, 4));
    }
    
    displayMenu(){
        console.log("-----------------Main Menu-----------------");
        console.log("           1. Add a product.");
        console.log("           2. Display all products.");
        console.log("           3. Modify a product.");
        console.log("           4. Delete a product.");
        console.log("           0. Quit");
        console.log("-------------------------------------------");
    }

    displayModifyMenu(){
        console.log("What do you want to modify ?");
        console.log("   1. Name.");
        console.log("   2. Description.");
        console.log("   3. Quantity");
        console.log("   4. Price.")
        console.log("   0. To go back");
    }

    displayProduct(i){
        console.log("-------------------------------------------");
        console.log(`   Product ${i+1}`);
        console.log("Name :" + this.products[i].name);
        console.log("Descreption : " + this.products[i].description);i
        console.log("Quantity : " + this.products[i].quantity);
        console.log("Price : " + this.products[i].price);
    }

    displayAllProducts()
    {
        if (this.products.length === 0) {
            console.log("-------------------------------------------");
            console.log("No products to display !");
            console.log("-------------------------------------------");
        }
        else{
            for (let i = 0; i < this.products.length; i++) 
            {this.displayProduct(i);}
        }
    }
    
    addProduct() {
        let amount = Number(prompt("Enter how many products do you want to add :"), 10);
        console.log("-------------------------------------------");
    
        for (let i = 0; i < amount; i++) {
            let product = new prdct();
            
            console.log(`   Product ${this.products.length + 1} :`);
            product.name = prompt("Name:");
            product.description = prompt("description:");

            product.quantity = parseInt(prompt("Quantity:"), 10);
            while (isNaN(product.quantity)) {
                console.log("Invalid quantity. Please enter a valid number.")
                product.quantity = parseInt(prompt("Quantity:"), 10);
            }

            product.price = parseFloat(prompt("Price:"));
            while (isNaN(product.price)) {
                console.log("Invalid price. Please enter a valid number.")
                product.quantity = parseFloat(prompt("Price:"));
            }
            
            this.products.push(product);
            this.saveProducts();
            console.log("-------------------------------------------");
            console.log("Product added successfully!");
            console.log("-------------------------------------------");
        }
    }

    modifyProduct(){
        let modifyChoice; //to take choice of which product to modify.
        let modifyIndex; //to take index of what to modify in the product.
    
        if (this.products.length === 0) {
            console.log("-------------------------------------------");
            console.log("No products to modify !");
            console.log("-------------------------------------------");
        }
        else{
            do {
                this.displayAllProducts();
                console.log("-------------------------------------------");
                console.log("Which product you want to modify:");
                console.log("   0. To go back.")
                modifyChoice = Number(prompt(" "));
    
                if (modifyChoice === 0) {
                    continue;
                }
    
                if (modifyChoice<0 || modifyChoice>this.products.length) {
                    console.log("-------------------------------------------");
                    console.log("Invalid choice! Please select a valid option.");
                    console.log("-------------------------------------------");
                }
                else{
                    do {
                        this.displayProduct(modifyChoice-1);
                        console.log("-------------------------------------------");
                        this.displayModifyMenu();
                        modifyIndex = Number(prompt(" "));
                        console.log("-------------------------------------------");
    
                        switch (modifyIndex) {
                            case 0://skips the rest of the code and closes dowhile
                                continue;
                            case 1:
                                console.log("Current name (leave a blank to keep the current):" + this.products[modifyChoice-1].name);
                                let newName = prompt("Enter the new name :");
                                if (newName) {this.products[modifyChoice-1].name = newName;}
                                break;
                            case 2:
                                console.log("Current description :" + this.products[modifyChoice-1].description);
                                let newDescription = prompt("Enter the new name :");
                                if (newDescription) {this.products[modifyChoice-1].description = newDescription;}
                                break;
                            case 3:
                                console.log("Current quantity :" + this.products[modifyChoice-1].quantity);
                                let newQuantity = prompt("Enter the new name :");
                                if (newQuantity) {this.products[modifyChoice-1].quantity = newQuantity;}
                                break;
                            case 4:
                                console.log("Current price :" + this.products[modifyChoice-1].price);
                                let newPrice = prompt("Enter the new name :");
                                if (newPrice) {this.products[modifyChoice-1].price = newPrice;}
                                break;
                            default:
                                console.log("Invalid choice! Please select a valid option.");
                                break;
                        }
                        console.log("-------------------------------------------");
                    } while (modifyIndex);
                }
                this.saveProducts();
            } while (modifyChoice);
        }
    }

    deleteProduct() {
        let deleteChoice;//to take choice of which product to delete.
        do {
            if (this.products.length === 0) {
                deleteChoice = 0;
                console.log("-------------------------------------------");
                console.log("No products to delete !");
                console.log("-------------------------------------------");
            }
            else{
                while (this.products.length && deleteChoice != 0) {
                    this.displayAllProducts();
                    console.log("-------------------------------------------");
                    console.log("Which product you want to delete:");
                    console.log("   0. To go back.")
                    deleteChoice = Number(prompt(" "));
    
                    if (deleteChoice === 0) {
                        continue;
                    }
                    if (deleteChoice<0 || deleteChoice>this.products.length) {
                        console.log("-------------------------------------------");
                        console.log("Invalid choice! Please select a valid option.");
                        console.log("-------------------------------------------");
                    }
                    else{
                        this.products.splice(deleteChoice-1, 1)
                        this.saveProducts();
                        console.log("-------------------------------------------");
                        console.log(`Product ${deleteChoice} deleted successfully.`);
                        console.log("-------------------------------------------");
                    }
                }
            }
        } while (deleteChoice);
    }
}

module.exports = inverntory;
