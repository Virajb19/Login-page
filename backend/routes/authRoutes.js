import { Router } from "express";
import { checkAuth, forgotPassword, resetPassword, signin, signout, signup, verifyEmail } from "../controllers/auth.ctr.js";
import { verifyToken } from "../middleware/verifyToken.js";


export const authRouter = Router()

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)
authRouter.post('/signout',signout)
authRouter.post('/verify-email', verifyEmail)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password/:token', resetPassword)

authRouter.get('/check-auth',verifyToken, checkAuth)