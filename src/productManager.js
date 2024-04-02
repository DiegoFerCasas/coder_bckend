import fs from 'fs'


class ProductManager {
    #products
    #path

    constructor() {
        this.#products = []
        this.#path = "./titles.json"
    }

    #autoId() {
        if (this.#products.length === 0) {
            return 1;
        }
        return this.#products.at(-1).id + 1;
    }

    getProducts() {
        let readTitles = JSON.parse(fs.readFileSync(this.#path, 'utf-8'))
        return readTitles;
    }
    /**
     * 
     * @param {number} id 
     * @param {string} title 
     * @param {string} description 
     * @param {number} price 
     * @param {string} thumbnail 
     * @param {string} code 
     * @param {number} stock 
     */
    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.#autoId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        let validateCode = product.code
        if (this.#products.some(e => e.code === validateCode)) {
            console.log("ERROR, el código ya existe")
        } else {
            this.#products.push(product)
            const titles = JSON.stringify(this.#products, null, '\t')
            fs.writeFileSync(this.#path, titles, 'utf-8')
        }

    }

    deleteProduct(value) {
        const productsJson = JSON.parse(fs.readFileSync("./titles.json", 'utf-8'))
        const find = productsJson.findIndex((e) => e.id === value)
        productsJson.splice(find, 1)
        fs.writeFileSync('./titles.json', JSON.stringify(productsJson, null, '\t'), 'utf-8')
    }

    getProductById(value) {
        const productsJsonId = JSON.parse(fs.readFileSync("./titles.json", 'utf-8'))
        const find = productsJsonId.find((e) => e.id === value)
        if (find != undefined) {
            return find
        } return "not found"
    }

}

export default ProductManager


