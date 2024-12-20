const fs = require('fs');
const prompt = require("prompt-sync")();
const prdct = require("./product");
const filePath = 'C:\\Users\\jawad\\Desktop\\javasc\\stock manager\\inventory.json';

class inverntory {
    
    products = [];
    productCounter = 0;
    

    constructor() {
        if(fs.existsSync(filePath)){
            this.products = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        }
    }
    
    saveProducts(){
        fs.writeFileSync(filePath, JSON.stringify(this.products, null, 4));
    }
    
    displayMenu() {
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
            {
                this.displayProduct(i);
            }
        }
    }
    
    addProduct() {
        let amount = Number(prompt("Enter how many products do you want to add :"), 10);
        console.log("-------------------------------------------");
    
        for (let i = this.productCounter; i < amount+this.productCounter; i++) {
            console.log(`   Product ${i + 1} :`);
            
            let product = new prdct();
    
            product.name = prompt("Name:");
            product.description = prompt("description:");
            product.quantity = parseInt(prompt("Quantity:"), 10);
            product.price = parseFloat(prompt("Price:"));
    
            this.products.push(product);
            this.saveProducts();
            console.log("-------------------------------------------");
            console.log("Product added successfully!");
            console.log("-------------------------------------------");
        }
        this.productCounter = this.productCounter + amount;
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
                                console.log("Current name :" + this.products[modifyChoice-1].name);
                                this.products[modifyChoice-1].name = prompt("Enter the new name :");
                                break;
                            case 2:
                                console.log("Current description :" + this.products[modifyChoice-1].description);
                                this.products[modifyChoice-1].description = prompt("Enter the new description :");
                                break;
                            case 3:
                                console.log("Current quantity :" + this.products[modifyChoice-1].quantity);
                                this.products[modifyChoice-1].quantity = parseInt(prompt("Enter the new quantity :"), 10);
                                break;
                            case 4:
                                console.log("Current price :" + this.products[modifyChoice-1].price);
                                this.products[modifyChoice-1].price = parseFloat(prompt("Enter the new price :"), 10);
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
                        this.productCounter --;
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