import fs from "fs";

class CartManager {
  #items;
  #path;
  constructor() {
    this.#items = [];
    this.#path = "../file/Carts.json";
  }

  keepReading = async () => {
    try {
      const data = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  };
getCartById = async (value)=>{
  try{
    const allCart= await this.keepReading()
    const cartFind =  allCart.find(e=>e.id === Number(value))
    if(cartFind){
      return cartFind
    }else{return "not found"}
  }catch(error){console.log(error)}
}
//   getCartById = async (value) => {
//     try {
//       const allCart = await this.keepReading();
//       const cartFind = allCart.find((e) => e.id === value);
//       if (cartFind !== undefined) {
//         return cartFind
//       }return "not found"
//     } catch (error) {
//       console.log(error);
//     }
//   };
}

const constante = new CartManager();


//console.log(constante.keepReading())
//console.log(constante.keepReading());
console.log(constante.getCartById(2));
export default CartManager;
