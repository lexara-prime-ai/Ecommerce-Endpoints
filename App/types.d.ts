////////////////////////////
///////// IMPORTS /////////
//////////////////////////
import { Request } from "express";

// INTERFACES
interface User extends Request {
    // userPassword(userPassword: string, userPassword1: any): unknown;
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

interface Product extends Request {
    body: {
        productName: string
        productImage: string
        productDescription: string
        price: number
    },
    params: {
        productId: string
    }
}

interface decodedData {
    userId: string
    email: string
    firstName: string
    lastName: string
}

interface Info extends Request {
    info?: decodedData
}
