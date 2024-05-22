import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import userRouter from "./routes/users.router.js";
import { __dirname, uploader } from "./utils.js";
import handlebars from "express-handlebars";
import viewRouter from "./routes/views.router.js";
import { Server } from "socket.io";
import connectDB from "./config/server.js";
import productsSocket from "./utils/rtmSocket.js";
import chatSocket from "./utils/chatSocket.js";

const app = express();

const httpServer = app.listen(8080, (error) => {
  console.log("escuchando puerto 8080");
});
const io = new Server(httpServer);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

connectDB();

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
); // metodo para el motor de plantillas
app.set("views", __dirname + "/views"); // confiuracion para las vistas
app.set("view engine", "hbs");


app.use("/upload-file", uploader.single("myFile"), (req, res) => {
  if (!req.file) {
    return res.send("no se pudo subir eso");
  }
  res.send("archivo arriba");
});

app.use("/", viewRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send("error 500 en el server");
});

app.use(chatSocket(io))
app.use(productsSocket(io))

