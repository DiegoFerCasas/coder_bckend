import UserRepository from "../repository/users.repository.js";
import { UsersDao, ProductDao, CartsDao} from "../daos/factory.js";
import ProductManagerMongo from "../daos/mongo/productDao.mdb.js";
import CartManagerMongo from "../daos/mongo/cartDao.mdb.js";
import MessageManagerMongo from "../daos/mongo/messagesDao.mdb.js";


export const userService = new UserRepository(new UsersDao())
export const productService =  new ProductManagerMongo()
export const cartService =  new CartManagerMongo()
export const messageService = new MessageManagerMongo()


