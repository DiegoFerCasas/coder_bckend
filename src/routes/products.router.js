import { Router } from "express";
import ProductManager from "../managers/productManager.js"

const product = new ProductManager()


const router = Router()

router.get("/", async (req, res) => {
    const allProducts = await product.getProducts()
    res.send(allProducts);
});

router.post('/',(req,res)=>{
    console.log(req.body)
    res.post(product.addProduct())
})

router.get("/searchfilter", (req, res) => {
    const { limit } = req.query;
    const values = product.getProducts()
    if (!limit || limit <= '0') return res.send(values)
    const limitValue = values.splice(0,limit)
    res.send(limitValue);
});

router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const value = Number(pid)
    const pById = await product.getProductById(value)
    res.send(pById);
});

export default router


