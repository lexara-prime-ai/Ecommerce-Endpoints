///////////////////////////
//////// IMPORTS /////////
/////////////////////////
import mssql from 'mssql';
import path from 'path';
import dotenv from 'dotenv';
import ejs from 'ejs'; // TEMPLATE ENGINE
import { log } from 'console';
// CONFIGURE DOTENV PATH
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
import { User } from '../../types';
import { SQL_SERVER_CONFIG } from '../config/config';
import { sendMail } from '../helpers/mailer';


// EXPORT MODEULE | SEND_WELCOME_MAIL
export const SEND_WELCOME_MAIL = async () => {
    const pool = await mssql.connect(SQL_SERVER_CONFIG);
    const users: User[] = await (await pool.request().query('SELECT * FROM Users WHERE emailsReceived=0')).recordset;

    // LOOP THROUGH THE USERS AND SEND AN EMAIL
    for (let user of users) {
        // USE EJS | Template Engine | TO RENDER HTML
        ejs.renderFile('templates/welcome.ejs', { name: user.firstName }, async (err, html) => {
            try {
                let MESSAGE_CONFIG = {
                    from: process.env.EMAIL,
                    to: "stacknewbie@gmail.com",
                    subject: "Welcome",
                    html
                };
                // SEND MAIL
                await sendMail(MESSAGE_CONFIG);
            } catch (error: any) {
                log(error.message);
            }
        })

    }
}