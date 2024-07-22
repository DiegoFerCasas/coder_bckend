import {connectDB, objectConfig } from "../config/server.js"


export let ProductsDao
export let CartsDao
export let UsersDao
export let MessagesDao
export let TicketDao

switch (objectConfig.persistence) {
    case "MEMORY":

        break
    case "FS":

        break

    default:
        connectDB()
        console.log ("aquiestoy")
        const { default: ProductManagerMongo } = await import("./mongo/productDao.mdb.js")
        const { default: CartManagerMongo } = await import("./mongo/cartDao.mdb.js")
        const { default: UserManagerMongo } = await import("./mongo/UsersDao.mdb.js")
        const { default: MessageManagerMongo } = await import("./mongo/messagesDao.mdb.js")
        const {default: ticketDao} = await import ("./mongo/ticketDao.mdb.js")

        ProductsDao = ProductManagerMongo
        CartsDao = CartManagerMongo
        UsersDao = UserManagerMongo
        MessagesDao = MessageManagerMongo
        TicketDao = ticketDao

        break
}