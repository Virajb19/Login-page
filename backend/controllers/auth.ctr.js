import { userSchema } from "../types/userSchema.js"
import { client } from '../db.js'
import bcrypt from 'bcrypt'
import generateTokenAndSetCookie from "../utils/generateToken.js"

export async function signup(req,res){
    try {
        const userData = userSchema.safeParse(req.body)

        if(!userData.success) return res.status(400).json({msg: 'Invalid Inputs'})
        
        const {username, email, password} = userData.data

        if(!username || !email || !password) res.status(400).json({msg: 'All fields are required'})

        const userExists = await client.user.findFirst({where: {email}})

        if(userExists) return res.status(401).json({msg: 'user with that email already exists'})

        const hashedPassword = await bcrypt.hash(password,10)

        const verificationToken = Math.floor(Math.random() * 900000 + 100000).toString()

        const user = await client.user.create({data: {username, email, password: hashedPassword, verificationToken, verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)}})
  
        generateTokenAndSetCookie(res,user.id)      

        res.status(201).json({msg: 'user created successfully'})

    } catch(e) {
         res.status(400).json({msg: e.message})
    }
}

export async function signin(req,res){

}