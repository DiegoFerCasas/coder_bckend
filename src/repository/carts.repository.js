export default class CartsRepository {
    constructor(cartDao) {
        this.cartDao = cartDao
    }
    getCarts = async () => await this.cartDao.getAll()
    getCartsById = async () => await this.cartDao.getBy()
    addCart = async () => await this.cartDao.create()
    addCartProduct = async () => await this.cartDao.createProduct()
    modifyOrder = async () => await this.cartDao.update()
    deleteCartProduct = async () => await this.cartDao.deleteProduct()
    deleteCart = async () => await this.cartDao.delete()
}