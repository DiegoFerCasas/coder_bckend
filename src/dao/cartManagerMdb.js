import { cartModel } from "./models/carts.models.js";

class CartManagerMongo {
  getCarts = async () => {
    try {
      return await cartModel.find({}).lean();
    } catch (error) {
      return error;
    }
  };

  getCartById = async (value) => {
    try {
      return await cartModel.findById(value);
    } catch (error) {
      return { error: error.message };
    }
  };

  addCart = async (obj) => {
    try {
      return await cartModel.create(obj);
    } catch (error) {
      return { error: error.message };
    }
  };

  addCartProduct = async (cid, pid) => {
    
      const product = await cartModel.findOne({ _id: cid });
      console.log (product)
      const pIndex = product.products.findIndex((element) => element.pid === pid);

      if (pIndex != -1) {
        product.products[pIndex].quantity++;
        await product.save();
       
      } else {
        product.products.push({ pid: pid, quantity: 1 });
        await product.save();
      }
    
  };
}

export default CartManagerMongo;
