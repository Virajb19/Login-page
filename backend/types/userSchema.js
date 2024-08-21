import { z } from 'zod'

export const userSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    lastlogin: z.date().optional(),
    isVerified: z.boolean().optional()
})