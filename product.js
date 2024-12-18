class product {
    constructor(id, name, descreption, quantity, price) {
        this.id = Date.now();
        this.name = name;
        this.descreption = descreption;
        this.quantity = quantity;
        this.price = price;
    }
}

module.exports =  product;