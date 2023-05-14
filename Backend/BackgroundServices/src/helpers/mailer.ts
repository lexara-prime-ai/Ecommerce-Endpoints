/////////////////////////////
///////// IMPORTS //////////
///////////////////////////
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path:path.resolve(__dirname, '../../.env') });
// DEBUGGING | LOGGING
const log = console.log;
// CONFIG SETTINGS FOR MAILING SERVER
let MAIL_SERVER_CONFIG = {
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        password: process.env.PASSWORD
    }
}
// INITIALIZE MAIL TRANSPORT
const INIT_TRANSPORT = (CONFIG: any) => {
    return nodemailer.createTransport(CONFIG);
}

// EXPORT MODULE | sendMail
export const sendMail = async (MESSAGE_CONFIG: any) => {
    let TRANSPORTER = INIT_TRANSPORT(MAIL_SERVER_CONFIG);
    await TRANSPORTER.sendMail(MESSAGE_CONFIG, (err, RESPONSE) => {
        log(RESPONSE);
    })
}