import passport from "passport";
import local from 'passport-local'
import { createHash, validPass } from "../utils/bcrypt";

const LocalStrategy = local.Strategy
const userService = new userManager()

export const initPassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, //req -> body 
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name } = req.body
        try {
            let userFound = await userService.getUserBy({ email: username })
            if (userFound) {
                console.log('elusuario ecist')
                return done(null, false)
            }

            let newUser = {
                first_name,
                last_name,
                email: username,
                password: createHash(password)
            }
            let result = await userService.createHash(newUser)
            return done(null, result)

        } catch (error) {
            return done('error al registrar el usuario' + error)
        }
    }))


    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await userService.getUserBy({ email: username })
            if (!user) {
                console.log("usuario no encontrado")
                return done(null, false)
            }
            if (!validPass(password, { password: user.password })) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
}

passport.serializeUser((user, done) => {
    done(null, user._id)
})  // guarda el _id en el session 
passport.deserializeUser(async (id, done) => {
    try {
        let user = await userService.getUserBy({ _id: id })
        done (null, user)
    } catch (error) {
        done(error)
    }
}) // session extrae el usuario 