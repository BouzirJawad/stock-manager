const prompt = require("prompt-sync")();
const inventory = require("./inventory")
const inv = new inventory();

function stockManager(){
    let menuOption;
do {
    inv.displayMenu();
    menuOption = Number(prompt("Enter your choice :"));
    switch (menuOption) {
        case 1:
            inv.addProduct();
            break;
        case 2:
            inv.displayAllProducts();
            break;
        case 3:
            inv.modifyProduct();
            break;
        case 4:
            inv.deleteProduct();
            break;
        case 0:
            console.log("-----------------------------------------------");
            console.log("Quitting... (see you next time)");
            console.log("-----------------------------------------------");
            break;
        default:
            console.log("-----------------------------------------------");
            console.log("invalid option! please select a valid option");
            console.log("-----------------------------------------------");
            break;
        }
    } while (menuOption);
}

stockManager();
