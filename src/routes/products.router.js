import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const product = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  const allProducts = await product.getProducts();
  res.send(allProducts);
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const value = Number(pid);
  const pById = await product.getProductById(value);
  res.send(pById);
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await product.addProduct(req.body);
    console.log(newProduct)
    res.status(200).send({ status: "success", newProduct });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const updtProduct = await product.updateProduct(req.params, req.body);
    res.send({ status: "success", updtProduct });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const deletedProduct = await product.deleteProduct();
    res.send({ status: "success", payload:deletedProduct });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.get("/searchfilter", (req, res) => {
  const { limit } = req.query;
  const values = product.getProducts();
  if (!limit || limit <= "0") return res.send(values);
  const limitValue = values.splice(0, limit);
  res.send(limitValue);
});

export default router;
