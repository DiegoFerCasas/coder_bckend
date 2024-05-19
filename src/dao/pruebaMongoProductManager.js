import { productModel } from "./models/products.model";

class ProductManagerDb {

    getProducts = async (queryValue) => {
        try {
            return await productModel.find({})
        } catch (error) { console.log(error) }
    }

    getProductById = async (value) => {
        try {
            const found = await productModel.findById(value)
            if (found !== undefined) {
                return found
            } return 'Title not found'
        } catch (error) { console.log(error) }
    }

    addProduct = async (product) => {
        const { title, description, code, price, status, stock, category, thumbnail } = product
        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnail) { return 'ingrese todos los datos ' } else {
            let validator = product.code

            if (await productModel.find({ code: validator })) {
                console.log("ERROR, el código ya existe")
            } else {
                const newProduct = {
                    title,
                    description,
                    code,
                    price,
                    status: true,
                    stock,
                    category,
                    thumbnail
                }
                const result = await productModel.create(newUser)
                res.status(200).send({ status: 'sucess', payload: result })
            }
        }
    }


updateProduct = async (value, obj) => {
    const { pid } = value
    const { title, description, code, price, status = true, stock, category, thumbnail } = obj
    if (!title, !description, !code, !price,  !stock, !category, !thumbnail) {
        return 'ingrese todos los datos para su actualización'
    } else{
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
    }
}


}