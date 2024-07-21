import { Router } from "express";
import UserManagerMongo from "../../daos/mongo/UsersDao.mdb.js";
import { auth } from "../../middlewares/auth.middleware.js";
import mongoose from "mongoose";
import passport from "passport";
import { authToken, generateToken } from "../../utils/jwt.js";
import { createHash, validPass } from "../../utils/bcrypt.js";

const sessionsRouter = Router()
const userService = new UserManagerMongo()

sessionsRouter.get('/github', passport.authenticate('github', { scope: 'user:email' }), async (req, res) => {

})

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    res.redirect('/products')
})

// sessionsRouter.post('/register', async (req, res) => {
//     try {
//         const { first_name, last_name, email, password } = req.body

//         if (!email || !password) return res.status(401).send({ status: 'error', error: 'Completar campos' })

//         const userExist = await userService.getUserBy({ email })

//         if (userExist) return res.status(401).send({ status: 'error', error: 'El usuario ya existe' })

//         const newUser = {
//             first_name,
//             last_name,
//             email,
//             password: createHash(password)
//         }

//         const result = await userService.createUser(newUser)

//         // const token = generateToken({
//         //     id: result._id,
//         //     email
//         // })
//         res.send('user registered')
//         //res.send({status:'success', token})

//     } catch (error) {
//         console.log(error)
//     }
// })

// sessionsRouter.post('/login', async (req, res) => {
//     const { email, password } = req.body
//     if (!email || !password) return res.status(401).send({ status: 'error', error: 'Completar campos' })

//     const result = await userService.getUserBy({ email })
//     if (!result) return res.status(401).send({ status: 'error', error: 'El usuario no existe' })

//     if (!validPass(password, { password: result.password })) return res.status(401).send({ status: 'error', error: 'Contraseña incorrecta' })

//     req.session.user = {
//         email,
//         admin: result.role === 'admin'
//     }
//     // const token =generateToken({
//     //     id:result._id

//     // })
//     //res.send({status:'success', token})
//     res.redirect('/realtimeproducts')
// })
sessionsRouter.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    //res.send({ status: 'success', message: 'user registrado' })
    res.redirect('/login')
})

sessionsRouter.post('/failregister', async (req, res) => {
    console.log('fallo la estrategia')
    res.send(({ error: 'failed' }))
})

sessionsRouter.post('/login', passport.authenticate('login', { failureRedirect: '/failogin' }), async (req, res) => {
    
    if (!req.user) return res.status(400).send({ status: 'error', error: 'credenciales invalidas' })
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email
    }
    //res.send({ status: 'success', payload: req.session.user })
    res.redirect('/realtimeproducts')
})

sessionsRouter.post('/faillogin', (req, res) => {

    res.send(({ error: 'fallo el login' }))
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

