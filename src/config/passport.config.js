import passport from "passport";
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import UserManagerMongo from "../daos/mongo/UsersDao.mdb.js";
import { createHash, validPass } from "../utils/bcrypt.js";

const LocalStrategy = local.Strategy
const userService = new UserManagerMongo()


export const initPassport = () => {

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv23ctnucbZOy9atZhFp',
        clientSecret: 'd369904c0fa621342bc9b301c7e682361799f72e',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'

    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile)
            let user = await userService.getUserBy({ email: profile._json.email })
            if (!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    email: profile._json.email,
                    password: ''
                }
                let result = await userService.createUser(newUser)
                done(null, result)
            } else {
                done(null, user)
            }

        } catch (error) {
            return done(error)
        }
    }))

    // session extrae el usuario 

    // Comentariado para uso de Github
    passport.use('register', new LocalStrategy({
        passReqToCallback: true, //req -> body 
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name } = req.body
        try {
            let userFound = await userService.getUserBy({ email: username })
            if (userFound) {
                console.log('elusuario exist')
                return done(null, false)
            }

            let newUser = {
                first_name,
                last_name,
                email: username,
                password: createHash(password)
            }
            let result = await userService.createUser(newUser)
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

    
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })  // guarda el _id en el session 


    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userService.getUserBy({ _id: id })
            done(null, user)
        } catch (error) {
            done(error)
        }
    })
}

