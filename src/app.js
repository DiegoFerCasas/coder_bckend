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
import cookieParser from "cookie-parser";
import session from "express-session";
import sessionsRouter from "./routes/sessions.router.js";
import FileStore from 'session-file-store'
import MongoStore from "connect-mongo";
import dotenv from 'dotenv'
import passport from "passport";
import { initPassport } from "./config/passport.config.js";

// import passport from "passport";
// import { initPassport } from "./config/passport.config.js";

const app = express();

const httpServer = app.listen(8080, (error) => {
  console.log("escuchando puerto 8080");
});
const io = new Server(httpServer);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("SeCrEtP@ss"))
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://dfercasas:ISG1dFUdEg5cpOHT@cluster0.yqs1z7n.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0',
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    ttl: 60 * 60 * 1000 * 24
  }),
  secret: 'SeCrEtP@ss',
  resave: true,
  saveUninitialized: true

}))
initPassport()
app.use(passport.initialize())
app.use(passport.session())


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
app.use("/api/sessions", sessionsRouter)

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send("error 500 en el server");
});

app.use(chatSocket(io))
app.use(productsSocket(io))

