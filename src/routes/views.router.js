import { Router } from "express";

const viewRouter = Router()

viewRouter.get ('/',(req, res)=>{
    res.render('index',{})
})



export default viewRouter