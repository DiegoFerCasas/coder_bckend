import { Router } from "express";
//import ProductManager from "../dao/productManagerFs.js"
import ProductManagerMongo from "../dao/dbManagers/productManagerMdb.js";

const viewRouter = Router()
const products = new ProductManagerMongo()

viewRouter.get('/', async (req, res) => {
    const productList = await products.getProducts()
    res.render('home', { productList })
})

viewRouter.get('/chat', (req, res) => {
    res.render('chat', {})

})

viewRouter.get('/realtimeproducts', (req,res)=>{
    res.render('realTimeProducts')
})



export default viewRouter