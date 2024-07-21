import { productService } from "../service/index.js";

class ProductController {
    constructor() {
        this.productService = productService
    }

    getProducts = async (req, res) => {
        const { limit } = req.query;
        try {
            const allProducts = await this.productService.getAll();

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
        const values = this.productService.getAll();
        if (!limit || limit <= "0") return res.send(values);
        const limitValue = values.splice(0, limit);
        res.send(limitValue);
    }

    getProductsById = async (req, res) => {
        const { pid } = req.params;
        const pById = await this.productService.getBy(pid);
        res.send(pById);
    }

    addProduct = async (req, res) => {
        try {
            const newProduct = await this.productService.create(req.body);
            res.status(200).send({ status: "success", newProduct });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    updateProduct = async (req, res) => {
        const { pid } = req.params;
        try {
            const listProducts = await this.productService.getAll();
            const found = listProducts.find((e) => e.id === parseInt(pid));
            if (found) {
                const updtProduct = await this.productService.update(req.params, req.body);
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
            const listProducts = await this.productService.getAll();
            const found = listProducts.find((e) => e.id === parseInt(pid));
            if (found) {
                const deletedProduct = await this.productService.delete();
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