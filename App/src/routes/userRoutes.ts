/////////////////////////////
///////// IMPORTS //////////
////////////////////////////
import { Router } from "express";
import { addUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/userController";

// INITIALIZE ROUTER
const userRoutes = Router();
// ROUTES
//// GET ////
userRoutes.get('/:userId', getUserById); // GET USER BY ID
userRoutes.get('', getUsers);            // GET ALL USERS
//// POST ////
userRoutes.post('', addUser);            // ADD USER
//// DELETE ////
userRoutes.delete('/:userId', deleteUser); // DELETE USER
//// UPDATE ////
userRoutes.put('/:userId', updateUser);

// EXPORTS
export default userRoutes;
