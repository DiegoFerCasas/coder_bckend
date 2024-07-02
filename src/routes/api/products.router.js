import { Router } from "express";
import ProductController from "../../controllers/product.controller.js";
// import ProductManager from "../dao/productManagerFs.js";
// const product = new ProductManager();

const router = Router();
const {
  getProducts,
  getProductsView,
  getProductsById,
  addProduct,
  updateProduct,
  deleteProduct
}= new ProductController

router.get("/", getProducts);

router.get("/:pid", getProductsById);

router.get("/searchfilter", getProductsView);

router.post("/", addProduct);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProduct);


export default router;
