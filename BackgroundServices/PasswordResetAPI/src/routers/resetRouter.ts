//////////////////////
////// IMPORTS //////
//////////////////////
import { Router } from "express";
import { INIT_MAIL_SERVER } from "../controllers/mailer";
import { VERIFY_TOKEN } from "../middleware/verifyToken";
// INITIALIZE ROUTER
const resetRouter = Router();

resetRouter.get('/:email', VERIFY_TOKEN, INIT_MAIL_SERVER);

export default resetRouter;