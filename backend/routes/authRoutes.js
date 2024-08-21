import { Router } from "express";
import { signup } from "../controllers/auth.ctr.js";


export const authRouter = Router()

authRouter.post('/signup', signup)