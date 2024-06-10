import { response, Router } from "express";
//import ProductManager from "../dao/productManagerFs.js"
import ProductManagerMongo from "../dao/dbManagers/productManagerMdb.js";
import CartManagerMongo from "../dao/dbManagers/cartManagerMdb.js";
import { auth } from "../middlewares/auth.middleware.js";

const viewRouter = Router()
const products = new ProductManagerMongo()
const carts = new CartManagerMongo()

viewRouter.get('/', async (req, res) => {
    const productList = await products.getProducts()
    res.render('home', { productList })
})

viewRouter.get('/products', async (req, res) => {
    const { limit, numPage, sortOrder, query } = req.query
    const { docs, page, hasPrevPage, hasNextPage, prevPage, nextPage } = await products.getProductsView({ limit, numPage, sortOrder, query })
    
    res.render('products', {
        titles: docs,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    })
})

viewRouter.get('/chat', (req, res) => {
    res.render('chat', {})

})

viewRouter.get('/realtimeproducts',auth,  (req, res) => {
    res.render('realTimeProducts')
})

// viewRouter.get('/cart/:cid', async (req, res) => {
    
// const {cid} = req.params
// const {docs , page, hasNextPage,hasPrevPage, prevPage, nextPage}= await carts.getCartByIdView(cid) 
// console.log(docs)
// res.render ('cart', {
//     carrito:docs,
//     page,
//     hasNextPage,
//     hasPrevPage,
//     prevPage,
//     nextPage

// })
// })
viewRouter.get('/cart/:cid', async (req, res) => {
    const { cid } = req.params
    const carrito = await carts.getCartById(cid)
    return res.render('cart', { carrito, styles: 'cart.css'})
})

viewRouter.get('/login', async (req,res)=>{
res.render('login',{styles:'login.css'})
})
viewRouter.get('/register', async (req,res)=>{
    res.render('register',{styles:'register.css'})
    })


export default viewRouter