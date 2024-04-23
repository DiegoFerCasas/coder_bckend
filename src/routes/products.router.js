import { Router } from "express";
import ProductManager from "../managers/productManager.js"

const product = new ProductManager()


const router = Router()

router.get("/", (req, res) => {
    res.send(product.getProducts());
});

router.get("/searchfilter", (req, res) => {
    const { limit } = req.query;
    const values = product.getProducts()
    if (!limit || limit <= '0') return res.send(values)
    const limitValue = values.splice(0,limit)
    res.send(limitValue);
});

router.get("/:pid", (req, res) => {
    const { pid } = req.params;
    const value = Number(pid)
    res.send(product.getProductById(value));
});

export default router


