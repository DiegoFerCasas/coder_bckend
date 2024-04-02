import express from 'express'
import ProductManager from "./productManager.js"
const app = express();

const product = new ProductManager()


app.get("/products", (req, res) => {
    res.send(product.getProducts());
});

app.get("/productsfilter", (req, res) => {
    const { limit } = req.query;
    const values = product.getProducts()
    if (!limit || limit <= '0') return res.send(values)
    const limitValue = values.splice(0,limit)
    res.send(limitValue);
});

app.get("/products/:pid", (req, res) => {
    const { pid } = req.params;
    const value = Number(pid)
    res.send(product.getProductById(value));
});

app.listen(8080, (error) => {
    console.log("escuchando puerto 8080");
});
