import { Router } from "express";
import { userModel } from "../models/user.models.js";

const userRouter = Router()



userRouter.get('/', async (req, res) => {
    const users = await userModel.find({})
    res.send(users)

})

userRouter.post('/', async (req, res) => {
    const { first_name, last_name, email } = req.body

    if (!email) return res.send({ status: 'error', error: 'faltan campos' })

    const newUser = {
        first_name,
        last_name,
        email
    }

    const result = await userModel.create(newUser)
    res.status(200).send({ status: 'sucess', payload: result })
})


userRouter.put('/:uid', async (req, res) => {
    const { uid } = req.params
    const { first_name, last_name, email } = req.body

    if (!email, !last_name, !email) return res.send({ status: 'error', error: 'faltan campos' })

    const result = await userModel.updateOne({ _id: uid }, { first_name, last_name, email })

    res.status(200).send({ status: 'sucess', payload: result })
})

userRouter.delete('/:uid', async (req, res) => {

    const { uid } = req.params

    const result = await userModel.deleteOne({ _id: uid })
    res.status(200).send({ status: 'sucess', payload: result })
})






export default userRouter