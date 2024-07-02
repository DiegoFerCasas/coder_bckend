import express from "express";
import handlebars from "express-handlebars";
import FileStore from 'session-file-store'
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import session from "express-session";

import routerApp from './routes/index.js';


import { __dirname, uploader } from "./utils.js";
import productsSocket from "./utils/rtmSocket.js";
import chatSocket from "./utils/chatSocket.js";
import { connectDB, objectConfig } from "./config/server.js";
import { initPassport } from "./config/passport.config.js";
import passport from "passport";

const { port } = objectConfig

const app = express();


const httpServer = app.listen(port, (error) => {
  console.log("escuchando puerto "+port);
});
const io = new Server(httpServer);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("SeCrEtP@ss"))
app.use(chatSocket(io))
app.use(productsSocket(io))
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


app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
); // metodo para el motor de plantillas
app.set("views", __dirname + "/views"); // confiuracion para las vistas
app.set("view engine", "hbs");



app.use(routerApp)


