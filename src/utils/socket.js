import { messageService, productService } from "../service/index.js";

const products = productService
const chat = messageService

export const chatSocket = (io) => {
    io.on("connection", async (socket) => {
      console.log("Connected");
  
      socket.on("mensaje_cliente", async (data) => {
          await chat.addMessages(data);
        io.emit("messageLogs", await chat.getMessages());
      });
    });
    return (req, res, next) => {
      req.io = io;
      next();
    };
  };


export const realTimeSocket = (io) => {
    io.on("connection", async (socket) => {
      console.log("Conectado a RTP");
  
      const productList = await products.getProducts();
      io.emit("rtp_connected", productList);
  
      socket.on("addProduct", async (value) => {
        await products.addProduct(value);
        const productList = await products.getProducts();
        io.emit("rtp_connected", productList);
      });
    });
    return (req, res, next) => {
      req.io = io;
      next();
    };
  };