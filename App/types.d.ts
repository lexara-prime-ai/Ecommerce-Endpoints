////////////////////////////
///////// IMPORTS /////////
//////////////////////////
import { Request } from "express";

// INTERFACES
interface RequestFormat extends Request {
    body: {
        email: string
        userPassword: string
        firstName: string
        lastName: string
        streetAddress: string
        city: string
        country: string
        phone: string
    },
    params: {
        userId: string
    }
}

