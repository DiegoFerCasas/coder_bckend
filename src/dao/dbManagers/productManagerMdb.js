import { productModel as productsModel } from "../models/products.model.js";

class ProductManagerMongo {

    getProducts = async () => {
        try {
            return await productsModel.find({}).lean()
        }
        catch (error) {
            return error
        }
    }
    /**
     * 
     * @param {String} id 
     * @returns 
     */
    getProductById = async (id) => {
        try {
            return await productsModel.findById(id)
        } catch (error) {
            return { error: error.message }
        }

    }

    addProduct = async (product) => {
        if (await productsModel.find({ code: product.code })) {
            console.log("Error el código ya existe")
        }
        try {
            await productsModel.create(product)
            return await productsModel.findOne({ title: product.title })

        } catch (error) {
            return error
        }
    }

    updateProduct = async (id, product) => {
        try {
            return await productsModel.findByIdAndUpdate(id, { $set: product })
        } catch (error) {
            return error
        }
    }

    deleteProduct = async (value) => {
        try {
            return await productsModel.findByIdAndDelete(value)
        } catch (error) {
            return error
        }
    }

}


export default ProductManagerMongo