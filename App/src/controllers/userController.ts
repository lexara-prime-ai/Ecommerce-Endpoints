////////////////////////
/////// IMPORTS ///////
//////////////////////
import { Request, Response } from 'express';
import mssql from 'mssql';
import crypto from 'crypto';
// DEBUGGING | LOGGING
import { log } from 'console';
import { sqlServerConfig } from '../config/config';
import { RequestFormat } from '../../types';
import { DB_FUNCTIONS } from '../helpers/DB_FUNCTIONS';

// EXPORT MODULE | GET USER BY ID
export const getUserById = async (req: Request<{ userId: string }>, res: Response) => {
    try {
        const { userId } = req.params;
        // EXECUTE STORED PROCEDURE
        let user = await (await DB_FUNCTIONS.EXECUTE('getUserById', { userId })).recordset[0];
        if (!userId) {
            return res.status(404).json({
                message: 'User not found!'
            });    
        }
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json(error);
    }
}

// EXPORT MODULE | GET USERS
export const getUsers = async (req: RequestFormat, res: Response) => {
    try {
        // EXECUTE STORED PROCEDURE
        let users = await (await DB_FUNCTIONS.EXECUTE('getUsers')).recordset;
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json(error);
    }
}

// EXPORT MODULE | ADD USER
export const addUser = async (req: RequestFormat, res: Response) => {
    try {
        // CREATE RANDOM UUID FOR USER
        const userId = crypto.randomUUID();
        // GET VALUES FROM REQUEST BODY(The req body does not have a body
        // hence the use of RequestFormat to extend the type Request)
        const {
            email,
            userPassword,
            firstName,
            lastName,
            streetAddress,
            city,
            country,
            phone
        } = req.body;
        // EXECUTE STORED PROCEDURE
        await DB_FUNCTIONS.EXECUTE('addUser', {
            userId,
            email,
            userPassword,
            firstName,
            lastName,
            streetAddress,
            city,
            country,
            phone
        })
        res.status(201).json({
            message: 'User added successfully!'
        });
    } catch (error: any) {
        res.status(500).json(error);
    }
}

// EXPORT MODULE | UPDATE USER
export const updateUser = async (req: Request<{ userId: string }>, res: Response) => {
    try {
        const { userId } = req.params;
        // EXECUTE STORED PROCEDURE
        (await DB_FUNCTIONS.EXECUTE('updateUser', { userId })).recordset[0];
        res.status(201).json({
            message: 'Update successful!'
        });
    } catch (error: any) {
        res.status(500).json(error);
    }
}

// EXPORT MODULE | DELETE USER
export const deleteUser = async (req: RequestFormat, res: Response) => {
    try {
        const { userId } = req.params;
        // EXECUTE STORED PROCEDURE
        await (await DB_FUNCTIONS.EXECUTE('deleteUser', { userId }));
        if (!userId) {
            res.status(404).json({
                message: 'User not found!'
            });
        }
        res.status(200).json({
            message: 'User deleted!'
        });
    } catch (error: any) {
        res.status(500).json(error);
    }
}