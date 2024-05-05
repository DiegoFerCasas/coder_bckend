import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js';
import { __dirname, uploader } from './utils.js';
import handlebars from 'express-handlebars'
import viewRouter from './routes/views.router.js';
import { Server } from 'socket.io';
import ProductManager from './managers/productManager.js';

const app = express();
const httpServer = app.listen(8080, (error) => {
    console.log("escuchando puerto 8080");
});
const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))


app.engine('hbs', handlebars.engine({
    extname: '.hbs'
})) // metodo para el motor de plantillas 
app.set('views', __dirname + '/views') // confiuracion para las vistas
app.set('view engine', 'hbs')



app.use('/upload-file', uploader.single('myFile'), (req, res) => {
    if (!req.file) {
        return res.send('no se pudo subir eso')
    }
    res.send('archivo arriba')
})
app.use('/', viewRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('error 500 en el server')
})



const products = new ProductManager()

socketServer.on('connection', async (socket) => {
    console.log('cliente on')

    // socket.on('message', data=>{
    //     console.log(data)
    // })

    // socket.emit('socket_individual', 'este msj solo lo recibe este socket')

    // socket.broadcast.emit('para_todos_menos_el_actual', 'este eveto lo resibe todos los sockjet menos el actual' )

    // socketServer.emit('evetnos_para_todos', 'este mjs lo reciebn todos inclucive el actual')

    const messages = []
    socket.on('mensaje_cliente', data => {
        console.log(data)
        messages.push({ id: socket.id, message: data })
        socketServer.emit('messageServer', messages)
    })

    const productList = await products.getProducts()
    socketServer.emit("rtp_connected", productList)

    socket.on("addProduct", async (value) => {
        await products.addProduct(value)
        const productList = await products.getProducts()
        socketServer.emit("rtp_connected", productList)

    })
})

