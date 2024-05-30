import { Router } from "express";
import mongoose from "mongoose";
import passport from "passport";

{
    sessionsRouter.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
        res.send{ status: 'success', message: 'user registrado' }
    })

    sessionsRouter.post('/failregister', (req, res) => { })

    sessionsRouter.post('/login', passport.authenticate('login', {failureRedirect: '/failogin'})), async (req,res)=>{
        if (!req.user) return res.status(400).send({status: 'error', error: 'credenciales invalidas'})
            req.session.user = {
        first_name: req.user.first.name
            }
    }



}