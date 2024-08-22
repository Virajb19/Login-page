import { Router } from "express";
import { signin, signout, signup, verifyEmail } from "../controllers/auth.ctr.js";


export const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/signout',signout)
authRouter.post('/verify-email', verifyEmail)