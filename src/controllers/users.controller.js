import { userService } from "../service/index.js"

class UserController {
    constructor() {
        this.userService = userService
     }

    getUsers = async (req, res) => {
        try{const users = await this.userService.getUsers()
        res.send(users)}catch(error){
            console.log(error)
        }

    }

    createUsers = async (req, res) => {
        const { first_name, last_name, email } = req.body

        if (!email) return res.send({ status: 'error', error: 'faltan campos' })

        const newUser = {
            first_name,
            last_name,
            email
        }

        const result = await userService.createUser(newUser)
        res.status(200).send({ status: 'sucess', payload: result })
    }

    updateUser = async (req, res) => {
        const { uid } = req.params
        const { first_name, last_name, email } = req.body

        if (!email, !last_name, !email) return res.send({ status: 'error', error: 'faltan campos' })

        const result = await userModel.updateOne({ _id: uid }, { first_name, last_name, email })

        res.status(200).send({ status: 'sucess', payload: result })
    }

    deleteUsers = async (req, res) => {

        const { uid } = req.params

        const result = await userModel.deleteOne({ _id: uid })
        res.status(200).send({ status: 'sucess', payload: result })
    }
}

export default UserController