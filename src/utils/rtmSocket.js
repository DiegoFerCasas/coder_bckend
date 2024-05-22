import ProductManagerMongo from "../dao/dbManagers/productManagerMdb.js";

const products = new ProductManagerMongo();

const productsSocket = (io) => {
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

export default productsSocket;