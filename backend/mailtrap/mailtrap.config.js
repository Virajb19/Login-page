import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv'

dotenv.config()

const TOKEN = process.env.MAILTRAP_TOKEN
const ENDPOINT = process.env.MAILTRAP_ENDPOINT

export const mailClient = new MailtrapClient({endpoint: ENDPOINT, token: TOKEN})

export const sender = {
    email: 'mailtrap@demomailtrap.com',
    name: 'viraj'
}



// const recipients = [
//     {
//         email: 'bviraj049@gmail.com',
//     }
// ]

// client.send({
//     from: sender,
//     to: recipients,
//     subject: 'you are awesome',
//     text: 'Hi there my friend',
//     category: 'Integration Test'
// }).then(res => console.log(res),console.error)

// async function sendEmail(){
//    try{
//     const res = await client.send({
//         from: sender,
//         to: recipients,
//         subject: 'you are awesome',
//         text: 'Hi there my friend',
//         category: 'Integration Test'
//     })

//    console.log(res)

//    } catch (e) {
//     console.log('Error sending email : ', e)
//    }
// }

// sendEmail()

