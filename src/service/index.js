import { UsersDao, ProductsDao, CartsDao, MessagesDao } from "../daos/factory.js";
import UserRepository from "../repository/users.repository.js";
import ProductRepository from "../repository/products.repository.js";
import CartsRepository from "../repository/carts.repository.js";
import MessageRepository from "../repository/messages.repository.js";


export const userService = new UserRepository(new UsersDao())
export const productService = new ProductRepository(new ProductsDao())
export const cartService = new CartsRepository(new CartsDao())
export const messageService = new MessageRepository(new MessagesDao())


