const nodemailer = require("nodemailer")
const { SMTPconfig } = require("../config/constants")
class EmailService{
    #transport
    constructor(){
       try {
        this.#transport = nodemailer.createTransport({
            host: SMTPconfig.host,
            port: SMTPconfig.port,
            service: SMTPconfig.provider,
            auth: {
                user: SMTPconfig.user,
                pass: SMTPconfig.password
            }
        })
       } catch (exception) {
            throw exception
       }
    }

    sendEmail = async ({to,subject,message})=>{
       
        try {
            const response = await this.#transport.sendMail({
                subject: subject,
                to: to,
                from: SMTPconfig.from,
                html: message,
            })
            return response
        } catch (exception) {
            throw exception
        }
    }
}

const emailSvc = new EmailService()
module.exports = emailSvc