import { Router } from "express";
import UserManagerMongo from "../dao/dbManagers/UsersManagerMdb.js";
import { auth } from "../middlewares/auth.middleware.js";
import mongoose from "mongoose";
import passport from "passport";

const sessionsRouter = Router()
const userService = new UserManagerMongo()

sessionsRouter.get('/github', passport.authenticate('github', { scope: 'user:email' }), async (req, res) => {

})

sessionsRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}), (req,res)=>{
    req.session.user = req.user
    res.redirect('/products')
})

sessionsRouter.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body

        if (!email || !password) return res.status(401).send({ status: 'error', error: 'Completar campos' })

        const userExist = await userService.getUserBy({ email })

        if (userExist) return res.status(401).send({ status: 'error', error: 'El usuario ya existe' })

        const newUser = {
            first_name,
            last_name,
            email,
            password
        }

        const result = await userService.createUser(newUser)
        console.log(result)
        res.send('user registered')
    } catch (error) {
        console.log(error)
    }
})

sessionsRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(401).send({ status: 'error', error: 'Completar campos' })

    const result = await userService.getUserBy({ email })
    if (!result) return res.status(401).send({ status: 'error', error: 'El usuario no existe' })

    req.session.user = {
        email,
        admin: result.role === 'admin'
    }
    res.redirect('/realtimeproducts')
})

sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send({ status: 'error', error: err })
        else return res.redirect('/login')
    })
})

sessionsRouter.get('/current', auth, async (req, res) => {
    res.send('datos sensibles')
})



export default sessionsRouter

// {
//     sessionsRouter.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
//         res.send{ status: 'success', message: 'user registrado' }
//     })

//     sessionsRouter.post('/failregister', (req, res) => { })

//     sessionsRouter.post('/login', passport.authenticate('login', {failureRedirect: '/failogin'})), async (req,res)=>{
//         if (!req.user) return res.status(400).send({status: 'error', error: 'credenciales invalidas'})
//             req.session.user = {
//         first_name: req.user.first.name
//             }
//     }



// }