import { cartModel } from "./models/carts.models.js";

class CartManagerMongo {
  constructor() {
    this.model = cartModel;
  }

  getCarts = async () => {
    try {
      return await this.model.find({}).lean();
    } catch (error) {
      return error;
    }
  };
  
  getCartById = async (value) => {
    try {
      return await this.model
        .findById(value)
        .populate("products.product")
        .lean();
    } catch (error) {
      return { error: error.message };
    }
  };

  getCartByIdView = async (cid) => {
    try {
      if (cid) {
        return await cartModel.paginate(
          { _id: cid },
          { lean: true, populate: { path: "products", select: "product" } }
        );
      }
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
    const cart = await this.model.findOne({ _id: cid });
    console.log(cart);

    const i = cart.products.findIndex((e) => e.product == pid);
    console.log(i);
    if (i != -1) {
      cart.products[i].quantity++;
      const resp = await this.model.findByIdAndUpdate({ _id: cid }, cart);
    } else {
      cart.products.push({ product: pid, quantity: 1 });
      const resp = await this.model.findByIdAndUpdate({ _id: cid }, cart);
    }
  };

  modifyOrderQuantity = async (cid, pid, quantity) =>
    await this.model.findOneAndUpdate(
      { _id: cid, "products.product": pid },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );

  deleteCartProduct = async (cid, pid) =>
    await this.model.findByIdAndUpdate(
      { _id: cid },
      { $pull: { products: { product: pid } } },
      { new: true }
    );

  deleteCart = async (cid) =>
    await this.model.findByIdAndUpdate(
      { _id: cid },
      { $set: { products: [] } },
      { new: true }
    );
}

export default CartManagerMongo;
