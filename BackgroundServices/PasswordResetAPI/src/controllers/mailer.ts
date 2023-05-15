//////////////////////
////// IMPORTS //////
//////////////////////
import mssql from 'mssql';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import { SQL_SERVER_CONFIG } from '../DB_CONFIG/config';
import { Request, Response } from 'express';
import { User } from '../../types'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// DEBUGGING | ERROR LOGGING
const log = console.log;

// MAIN FUNCTION
export const INIT_MAIL_SERVER = async () => {
    // CREATE TRANSPORTER OBJECT USING DEFAULT SMTP TRANSPORT
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'stacknewbie@gmail.com',    // MAILING SERVER  
            pass: 'uarptokxapbdrskl'  // CREDENTIALS
        }
    });

    // HTML CONTENT
    let htmlContent = `
        <h4>
            Use the following passcode to reset your account | <span>9PrsfwMBJj</span>
            <a href="www.thejitu.com">
                Reset password
            </a>
        </h4>
    `;

    // ESTABLISH CONNECTION WITH DATABASE(SQL SERVER)
    async function TARGET_USER(req: User, res: Response) {
        try {
            const { email } = req.body;
            const pool = await mssql.connect(SQL_SERVER_CONFIG);
            const user = await (await (await pool.request()).query(`SELECT * FROM Users WHERE email='${email}`)).recordset[0];
            log(user);

            // SEND MAIL WITH DEFINED TRANSPORT OBJECT
            let info = await transporter.sendMail({
                from: process.env.EMAIL,
                to: 'stacknewbie@gmail.com',
                subject: 'Password Reset',
                html: htmlContent
            });
            // LOG MESSAGE INFO
            log('Message sent: %s', info.messageId);


        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }



}

