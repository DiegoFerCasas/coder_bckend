import { cartService } from "../service/index.js";

class CartController {
    constructor(){
      this.cartService = cartService
    }

    getCarts = async (req, res) => {
        const allCart = await this.cartService.getCarts();
        res.send({ status: "success", allCart });
      }

    getCartById = async (req, res) => {
        const { cid } = req.params;
        const value = cid;
        const cartbyId = await this.cartService.getCartById(value);
        res.send({ status: "success", cartbyId });
      }

    //getCartByIdView = 

    addCart = async (req, res) => {
        const newCart = await this.cartService.addCart();
        res.status(200).json({ status: "success", newCart });
      }

    addCartProduct = async (req, res) => {
        try {
          const cid = req.params.cid;
          const pid = req.params.pid;
      
          await this.cartService.addCartProduct(cid, pid);
          res.send({
            status: "success",
            message: "Product added to cart successfully.",
          });
        } catch (error) {
          console.error("Error adding product to cart:", error);
          res
            .status(500)
            .json({ status: "error", message: "Failed to add product to cart." });
        }
      }

    modifyOrder = async (req, res) => {
        try {
          const { cid, pid } = req.params;
          const { quantity } = req.body;
      
      
          if (!quantity) return res.status(404).json({ status: "error", message: "La cantidad es obligatoria" })
      
          const uptcart = await this.cartService.modifyOrderQuantity(cid, pid, quantity);
      
          if (!uptcart) return res.status(404).json({ status: "error", message: "No se pudo realizar la actualización" })
          res.send({ status: "success", message: " cart modified successfully.", uptcart });
      
        } catch (error) {
          console.error("Error when try to delete  the cart:", error);
          res.status(500).json({ status: "error", message: "Failed to update cart." });
        }
      }

    deleteCartProduct = async (req, res) => {
        try {
          const cid = req.params.cid;
          const pid = req.params.pid;
      
          await this.cartService.deleteCartProduct(cid, pid);
          res.send({
            status: "success",
            message: "Product deleted form cart successfully.",
          });
        } catch (error) {
          console.error("Error when try to delete the product on the cart:", error);
          res.status(500).json({
            status: "error",
            message: "Failed to delete product from cart.",
          });
        }
      }

    deleteCart = async (req, res) => {
        try {
          const cid = req.params.cid;
      
          await this.cartService.deleteCart(cid);
      
          res.send({ status: "success", message: " cart deleted successfully." });
        } catch (error) {
          console.error("Error when try to delete  the cart:", error);
          res
            .status(404)
            .json({ status: "error", message: "Failed to delete cart." });
        }
      }

}

export default CartController