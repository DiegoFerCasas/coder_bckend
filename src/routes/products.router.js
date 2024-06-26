import { Router } from "express";
import ProductManagerMongo from "../dao/dbManagers/productManagerMdb.js";
// import ProductManager from "../dao/productManagerFs.js";
// const product = new ProductManager();

const product = new ProductManagerMongo();

const router = Router();

router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const allProducts = await product.getProducts();

    if (!limit || limit <= "0") {
      return res.send(allProducts);
    } else {
      const limitValue = allProducts.splice(0, limit);
      res.status(200).send({ status: "success", limitValue });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const pById = await product.getProductById(pid);
  res.send(pById);
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await product.addProduct(req.body);
    res.status(200).send({ status: "success", newProduct });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const listProducts = await product.getProducts();
    const found = listProducts.find((e) => e.id === parseInt(pid));
    if (found) {
      const updtProduct = await product.updateProduct(req.params, req.body);
      res.send({ status: "success", updtProduct });
    } else {
      res.status(400).json({ status: "error", message: "No existe el ID" });
    }
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const listProducts = await product.getProducts();
    const found = listProducts.find((e) => e.id === parseInt(pid));
    if (found) {
      const deletedProduct = await product.deleteProduct();
      res.send({ status: "success", payload: deletedProduct });
    } else {
      res.status(400).json({ status: "error", message: "No existe el ID" });
    }
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
