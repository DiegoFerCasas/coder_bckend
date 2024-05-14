import { Router } from "express";
import CartManager from "../dao/cartManager.js";

const cart = new CartManager();

const cartRouter = Router();




cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const value = Number(cid);
  const cartbyId = await cart.getCartById(value);
  res.send({ status: "success", cartbyId });
});


cartRouter.post("/", async (req, res) => {
const newCart = await cart.addCart()
res.status(200).json({ status: "success", newCart })
})


cartRouter.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    await cart.addCartProduct(cid, pid);
    res.send({ status: "success", message: "Product added to cart successfully." });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ status: "error", message: "Failed to add product to cart." });
  }
});

export default cartRouter;
