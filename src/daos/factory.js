import { objectConfig } from "../config/server.js"

export let ProductDao
export let CartsDao
export let UsersDao
export let MessagesDao

switch (objectConfig.persistence) {
    case "MEMORY":

        break
    case "FS":

        break

    default:
        const { default: ProductManagerMongo } = await import("./mongo/productDao.mdb.js")
        const { default: CartManagerMongo } = await import("./mongo/cartDao.mdb.js")
        const { default: UserManagerMongo } = await import("./mongo/UsersDao.mdb.js")
        const { default: MessageManagerMongo } = await import("./mongo/messagesDao.mdb.js")

        ProductDao = ProductManagerMongo
        CartsDao = CartManagerMongo
        UsersDao = UserManagerMongo
        MessagesDao = MessageManagerMongo
        break
}