import MessageManagerMongo from "../dao/dbManagers/messagesManager.js";

const chat = new MessageManagerMongo();

const chatSocket = (io) => {
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

export default chatSocket;
