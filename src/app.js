import express from 'express'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js';
import { __dirname, uploader } from './utils.js';

console.log(__dirname)
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

//middleware
// app.use((req, res, next) => {
//     req.nombre ='diego'
//     console.log('Tiempo: ', Date())
//     console.log('saludo desde el middleware')
//     next()

// }) 

app.use('/upload-file', uploader.single('myFile'), (req, res) => { 
    if(!req.file){
        return res.send('no se pudo subir eso')
    }
    res.send('archivo arriba')
})
app.use('/products', productsRouter)
app.use('/cart', cartRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('error 500 en el server')
})

// app.get('/', (req,res)=>{
//     res.status(200).send(<h1>Hola este seria el index</h1>)
// })
app.listen(8080, (error) => {
    console.log("escuchando puerto 8080");
});
