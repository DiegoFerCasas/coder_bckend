import { Router } from "express";
//import CartManager from "../dao/cartManager.js";
import CartManagerMongo from '../dao/dbManagers/cartManagerMdb.js'

const cart = new CartManagerMongo();

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
  const allCart = await cart.getCarts();
  res.send({ status: "success", allCart });
});


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
    const cid = req.params.cid;
    const pid = req.params.pid;

    await cart.addCartProduct(cid, pid);
    res.send({ status: "success", message: "Product added to cart successfully." });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ status: "error", message: "Failed to add product to cart." });
  }
});

export default cartRouter;
