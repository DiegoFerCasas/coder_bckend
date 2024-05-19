import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js';
import userRouter from './routes/users.router.js';
import { __dirname, uploader } from './utils.js';
import handlebars from 'express-handlebars'
import viewRouter from './routes/views.router.js';
import { Server } from 'socket.io';
//import ProductManager from './dao/productManagerFs.js';
import ProductManagerMongo from './dao/productManagerMdb.js';
import  connectDB  from './config/server.js';


const app = express();

const httpServer = app.listen(8080, (error) => {
    console.log("escuchando puerto 8080");
});
const io = new Server(httpServer)

function chatSocket(io) {
    return (req, res, next) => {
        req.io = io
        next()
    }
}

chatSocket(io)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

connectDB()
//mongoose.connect('mongodb://127.0.0.1:27017/ecommerce') //base de datos local
//mongoose.connect('mongodb+srv://dfercasas:ISG1dFUdEg5cpOHT@cluster0.yqs1z7n.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0')
//console.log("db conectada")


app.engine('hbs', handlebars.engine({
    extname: '.hbs'
})) // metodo para el motor de plantillas 
app.set('views', __dirname + '/views') // confiuracion para las vistas
app.set('view engine', 'hbs')

app.use(chatSocket(io))

app.use('/upload-file', uploader.single('myFile'), (req, res) => {
    if (!req.file) {
        return res.send('no se pudo subir eso')
    }
    res.send('archivo arriba')
})
app.use('/', viewRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('error 500 en el server')
})

const products = new ProductManagerMongo()




io.on('connection', async (socket) => {
    console.log('cliente on')
    const messages = []

    socket.on('mensaje_cliente', data => {
        messages.push(data)
        io.emit('messageLogs', messages)


    })


    const productList = await products.getProducts()
    io.emit("rtp_connected", productList)

    socket.on("addProduct", async (value) => {
        await products.addProduct(value)
        const productList = await products.getProducts()
        io.emit("rtp_connected", productList)

    })
})

// mongodb+srv://dfercasas:<password>@cluster0.yqs1z7n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

