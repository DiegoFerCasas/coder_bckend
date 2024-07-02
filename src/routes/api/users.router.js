import { Router } from "express";
import UserController from "../../controllers/users.controller.js";

const userRouter = Router()
const {
    getUsers,
    createUsers,
    updateUser,
    deleteUsers
} = new UserController

userRouter.get('/', getUsers)
userRouter.post('/',createUsers)
userRouter.put('/:uid',updateUser)
userRouter.delete('/:uid',deleteUsers)

export default userRouter