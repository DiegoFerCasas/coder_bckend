import fs from "fs";

class CartManager {
  #items;
  #path;
  constructor() {
    this.#items = [];
    this.#path = "./src/file/Carts.json";
  }

  keepReading = async () => {
    try {
      const data = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  };

  #autoId = async () => {
    try {
      const itemList = await this.keepReading();
      if (itemList.lenght === 0) {
        return 1;
      } else {
        return itemList.at(-1).id + 1;
      }
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (value) => {
    const { cid } = value;
    try {
      const allItems = await this.keepReading();
      const itemFound = allItems.find((e) => e.id === Number(value));
      if (itemFound !== undefined) {
        return itemFound;
      }
      return "Item not found";
    } catch (error) {
      console.log(error);
    }
  };

  addCart = async () => {
    const itemsCart = await this.keepReading();
    const newCart = {
      id: this.#autoId(),
      products: [],
    };
    itemsCart.push(newCart);
    await fs.promises.writeFile(
      this.#path,
      JSON.stringify(itemsCart, null, "\t"),
      "utf-8"
    );
  };

  addCartProduct = async (cid, pid) => {
    const itemsCart = await this.keepReading();
    const cartList = itemsCart.find((e) => e.id === cid);
    const pIndex = cartList.products.findIndex((element) => element.pid === pid);

    if (pIndex != -1) {
      cartList.products[pIndex].quantity++;
    } else {
      cartList.products.push({
        pid,
        quantity: 1,
      });
    }
    await fs.promises.writeFile(
      this.#path,
      JSON.stringify(itemsCart, null, "\t"),
      "utf-8"
    );
  };
}


export default CartManager;
