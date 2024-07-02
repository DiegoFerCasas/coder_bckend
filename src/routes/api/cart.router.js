import { Router } from "express";
import CartController from "../../controllers/cart.controller.js";
//import CartManager from "../dao/cartManager.js";


const cartRouter = Router();
const {
  getCarts,
  getCartById,
  addCart,
  addCartProduct,
  modifyOrder,
  deleteCartProduct,
  deleteCart
} =new CartController

cartRouter.get("/", getCarts);

cartRouter.get("/:cid", getCartById);

cartRouter.post("/", addCart);

cartRouter.post("/:cid/products/:pid", addCartProduct);

cartRouter.delete("/:cid/products/:pid", modifyOrder);

cartRouter.put("/:cid/products/:pid", deleteCartProduct);

cartRouter.delete("/:cid", deleteCart);

export default cartRouter;
