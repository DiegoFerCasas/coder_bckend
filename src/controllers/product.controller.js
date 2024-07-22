import  {productService}  from "../service/index.js";

class ProductController {
    constructor() {
        this.productService = productService
    }

    getProducts = async (req, res) => {
        const { limit } = req.query;
        try {
            console.log("aqui estoy")
            const allProducts = await this.productService.getProducts();

            if (!limit || limit <= "0") {
                return res.send(allProducts);
            } else {
                const limitValue = allProducts.splice(0, limit);
                res.status(200).send({ status: "success", limitValue });
            }
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    getProductsView = (req, res) => {
        const { limit } = req.query;
        const values = this.productService.getProducts();
        if (!limit || limit <= "0") return res.send(values);
        const limitValue = values.splice(0, limit);
        res.send(limitValue);
    }

    getProductsById = async (req, res) => {
        const { pid } = req.params;
        const pById = await this.productService.getproductsById(pid);
        res.send(pById);
    }

    addProduct = async (req, res) => {
        try {
            const newProduct = await this.productService.addProduct(req.body);
            res.status(200).send({ status: "success", newProduct });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    updateProduct = async (req, res) => {
        const { pid } = req.params;
        try {
            const listProducts = await this.productService.getproducts();
            const found = listProducts.find((e) => e.id === parseInt(pid));
            if (found) {
                const updtProduct = await this.productService.updateProduct(req.params, req.body);
                res.send({ status: "success", updtProduct });
            } else {
                res.status(400).json({ status: "error", message: "No existe el ID" });
            }
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    deleteProduct = async (req, res) => {
        const { pid } = req.params;
        try {
            const listProducts = await this.productService.getProducts();
            const found = listProducts.find((e) => e.id === parseInt(pid));
            if (found) {
                const deletedProduct = await this.productService.deleteProduct();
                res.send({ status: "success", payload: deletedProduct });
            } else {
                res.status(400).json({ status: "error", message: "No existe el ID" });
            }
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}

export default ProductController