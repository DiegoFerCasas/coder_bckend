import nodemailer from 'nodemailer'
import { objectConfig } from '../config/server.js'

const {gmail_pass,gmail_user} = objectConfig

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user:objectConfig.gmail_user,
        pass: objectConfig.gmail_pass
    }
})

export const sendEmail = async(email, subject, html)=>{
    return await transport.sendMail({
        from: 'Coder Test <digitalproject@gmail.com',
        to: gmail_user,
        subject:'',
        html:`<div>
        <h1>email de prueba</h1>
        </div>
        `,
        attachments:[{
            filename: '',
            path: '',
            cid:''
        }]
    
    })
}