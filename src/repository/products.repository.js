export default class ProductRepository {
    constructor(productDao) {
        this.productDao = productDao
    }
    getProducts = async () => await this.productDao.getAll()
    getProductsView = async (filter) => await this.productDao.getView(filter)
    getproductsById = async (filter) => await this.productDao.getBy(filter)
    addProduct = async (product) => await this.productDao.create(product)
    updateProduct = async (pid, product) => await this.productDao.update(pid, product)
    deleteProduct = async (value) => await this.productDao.delete(value)

}
