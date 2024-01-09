import { Router } from "express";
import passport from "passport";
import { passportError, authorization} from "../utils/messagesError.js";
import { postUser, getUsers } from "../controllers/users.controlers.js";
const routerUser = Router();

routerUser.get('/', passportError("jwt"), authorization("admin", "admin"), getUsers)
routerUser.post("/", passport.authenticate("register"),postUser )

export default routerUser;
