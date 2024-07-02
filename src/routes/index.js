import { Router } from "express";
import { uploader } from "../utils.js";
import productsRouter from "./api/products.router.js";
import cartRouter from "./api/cart.router.js";
import userRouter from "./api/users.router.js";
import sessionsRouter from "./api/sessions.router.js";
import viewRouter from "./views.router.js";

const router = Router()


router.use("/upload-file", uploader.single("myFile"), (req, res) => {
  if (!req.file) {
    return res.send("no se pudo subir eso");
  }
  res.send("archivo arriba");
});

router.use("/", viewRouter);
router.use("/api/users", userRouter);
router.use("/api/products", productsRouter);
router.use("/api/cart", cartRouter);
router.use("/api/sessions", sessionsRouter)

router.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send("error 500 en el server");
});



export default router