class product {
    constructor(id, name, description, quantity, price) {
        this.id = Date.now();
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
    }
}

module.exports =  product;