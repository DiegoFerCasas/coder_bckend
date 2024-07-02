import UserManagerMongo from "../dao/dbManagers/UsersManagerMdb.js";
import ProductManagerMongo from "../dao/dbManagers/productManagerMdb.js";
import CartManagerMongo from "../dao/dbManagers/cartManagerMdb.js";
import MessageManagerMongo from "../dao/dbManagers/messagesManager.js";


export const userService = new UserManagerMongo()
export const productService =  new ProductManagerMongo()
export const cartService =  new CartManagerMongo()
export const messageService = new MessageManagerMongo()


