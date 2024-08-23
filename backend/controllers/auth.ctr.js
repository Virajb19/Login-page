import { signinSchema, signupSchema } from "../types/userSchema.js"
import { client } from '../db.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import generateTokenAndSetCookie from "../utils/generateToken.js"
import sendVerificationEmail, { sendPasswordResetEmail, sendResetSuccessEmail, sendWelcomeEmail } from "../mailtrap/emails.js"

export async function signup(req,res){
    try {
        const userData = signupSchema.safeParse(req.body)

        if(!userData.success) return res.status(400).json({msg: 'Invalid Inputs'})
        
        const {username, email, password} = userData.data

        if(!username || !email || !password) res.status(400).json({msg: 'All fields are required'})

        const userExists = await client.user.findFirst({where: {email}})

        if(userExists) return res.status(401).json({msg: 'user with that email already exists'})

        const hashedPassword = await bcrypt.hash(password,10)

        const verificationToken = Math.floor(Math.random() * 900000 + 100000).toString()

        const user = await client.user.create({data: {username, email, password: hashedPassword, verificationToken, verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)}})
  
        generateTokenAndSetCookie(res,user.id)     
        
        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({msg: 'user created successfully'})

    } catch(e) {
         res.status(400).json({msg: e.message})
    }
}

export async function verifyEmail(req,res) {
     const {code} = req.body

     try {
        const user = await client.user.findFirst({where: {verificationToken: code, verificationTokenExpiresAt: {gt: new Date()}}})

        if(!user) return res.status(400).json({msg: 'Invalid or expired verification code'})

        const updatedUser = await client.user.update({
            where: {email: user.email},
            data: {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpiresAt: null
            }
        })

        await sendWelcomeEmail(user.email, user.username)

        res.status(200).json({msg: 'email sent successfully', updatedUser})

     } catch (e) {
           console.error('Error ocuured while verifying email : ', e)
           res.status(500).json({msg: 'Internal server error'})
     }

}

export async function signin(req,res){
     try {

        const parsedData = signinSchema.safeParse(req.body)

        if(!parsedData.success) return res.status(400).json({msg: 'Invalid credentials', success: false})

        const {email, password} = parsedData.data

        const user = await client.user.findFirst({where: {email}})

        if(!user) return res.status(400).json({msg: 'user not found'})

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) res.status(400).json({msg: 'Incorrect password'})

        generateTokenAndSetCookie(res,user.id)

       const updatedUser =  await client.user.update({where: {email}, data: {lastlogin: new Date()}})

        res.status(200).json({msg: 'User signed in successfully',updatedUser})

     } catch (e) {
        res.status(500).json({msg: 'Internal server error' + e.message})
     }
}

export async function signout(req,res){
     res.clearCookie("token")
     res.status(200).json({msg: 'Logged out successfully'})
}

export async function forgotPassword(req,res){
    const {email} = req.body
    try {

        const user = await client.user.findFirst({where: {email}})

        if(!user) return res.status(400).json({msg: 'User not found'})

        const resetToken = crypto.randomBytes(20).toString('hex')
        const resetTokenExpiresAt = new Date(Date.now() + 60 * 60  * 1000)

        await client.user.update({where: {email}, data: {resetPasswordToken: resetToken, resetPasswordExpiresAt: resetTokenExpiresAt}})

        await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)

        res.status(200).json({msg: 'Password reset email successfully sent'})

    } catch(e) {
         res.status(500).json({msg: 'Error occured while resetting password'})
    }
}

export async function resetPassword(req,res){
    try {
        
      const token = req.params.token
      const {password} = req.body

      const user = await client.user.findFirst({where: {resetPasswordToken: token, resetPasswordExpiresAt: {gt: new Date()}}})

      if(!user) return res.status(400).json({msg: 'Invalid or expired token'})

      const hashedPassword = await bcrypt.hash(password,10)

      await client.user.update({
        where: {email: user.email},
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpiresAt: null
        }
      })

   await sendResetSuccessEmail(user.email)

   res.status(200).json({msg: 'Password changed successfully'})

    } catch (e) {
        res.status(500).json({msg: 'Error occured while resetting password'})
    }
}

export async function checkAuth(req,res){
    try {

        const user = await client.user.findFirst({where: {id: req.userId}})

        if(!user) return res.status(400).json({msg: 'User not found'})

        res.status(200).json({msg: 'User found successfully', user})

    } catch (e) {
        res.status(400).json({msg: 'Error while authenticating'})
    }
}