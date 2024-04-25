import fs from 'fs'

class ProductManager {
    #products
    #path

    constructor() {
        this.#products = []
        this.#path = "./src/file/titles.json"
    }

    keepReading = async () => {
        try {
            const data = await fs.promises.readFile(this.#path, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            return []
        }

    }

    #autoId = async () => {
        try {
            const productList = await this.keepReading()
            if (productList.lenght === 0) {
                return 1;
            } else {
                return productList.at(-1).id + 1;

            }
        } catch (error) { console.log(error) }
    }


    getProducts = async () => {
        try {
            const readTitles = await this.keepReading()
            return readTitles
        } catch (error) { console.log(error) }
    }



    addProduct = async (product) => {
        const { title, description, code, price, status, stock, category, thumbnail } = product
        console.log(product)
        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) { return 'ingrese todos los datos ' } else {
            let validator = product.code
            const titles = await this.keepReading()
            if (titles.some(e => e.code === validator)) {
                console.log("ERROR, el código ya existe")
            } else {
                const newProduct = {
                    id: await this.#autoId(),
                    title,
                    description,
                    code,
                    price,
                    status: true,
                    stock,
                    category,
                    thumbnail
                }
                titles.push(newProduct)
                await fs.promises.writeFile(this.#path, JSON.stringify(titles, null, '\t'), 'utf-8')
                return titles
            }

        }

    }

    updateProduct = async (value, obj) => {
        const { pid } = value
        const { title, description, code, price, status = true, stock, category, thumbnail } = obj
        if (title === undefined || description === undefined || code === undefined || price === undefined || status === undefined || stock === undefined || category === undefined || thumbnail === undefined) {
            return 'ingrese todos los datos para su actualización'
        } else {
            const titles = await this.keepReading()
            const titleFound = titles.map((element) => {
                if (element.id === parseInt(pid)) {
                    const updatedProduct = {
                        ...element,
                        title,
                        description,
                        code,
                        price,
                        status: true,
                        stock,
                        category,
                        thumbnail
                    }
                    return updatedProduct
                } else {
                    return element
                }
            })
            await fs.promises.writeFile(this.#path, JSON.stringify(titleFound, null, '\t'), 'utf-8')
        }
    }

    deleteProduct = async (value) => {
        try {
            const titles = await this.keepReading()
            const find = titles.findIndex(e => e.id === value)
            titles.splice(find, 1)
            await fs.promises.writeFile(this.#path, JSON.stringify(titles, null, '\t'), 'utf-8')
            return titles

        } catch (error) {

        }
    }

    getProductById = async (value) => {
        try {
            const titles = await this.keepReading()
            const found = titles.find((e) => e.id === value)
            if (found !== undefined) {
                return found
            } return 'Title not found'
        } catch (error) { console.log(error) }
    }
    
    

}

export default ProductManager


