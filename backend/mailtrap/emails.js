import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailsTemplates.js"
import { mailClient, sender } from "./mailtrap.config.js"

export default async function sendVerificationEmail(email, verificationToken) {
    const recipients = [{email}]
    try {
        const res = await mailClient.send({
            from: sender,
            to: recipients,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: 'Email Verification'
       })

      console.log(res)

    } catch (e) {
        console.error('Error sending email : ', e)
        throw new Error(`Error sending verification email: ${e}`)
    }
}

export async function sendWelcomeEmail(email,username){
    const recipients = [{email}]
     try {
        
      const res =  await mailClient.send({
        from: sender,
        to: recipients,
        template_uuid: '968da882-5236-42d0-b2b8-9a3c23a8985d',
        template_variables: {
            company_info_name: 'Auth company',
            name: username
        }
       })

       console.log(res)

     } catch (e) {
          console.error('Error sending email : ', e)
     } 
}

export async function sendPasswordResetEmail(email, resetURL){
      const recipients = [{email}]
      try {

        const res = await mailClient.send({
            from: sender,
            to: recipients,
            subject: 'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: 'Password Reset'
        })

        console.log(res)

      } catch (e) {
         console.error('Error sending password reset email', e)
         throw new Error(`Error sending password reset email : ${e}`)
      }
}

export async function sendResetSuccessEmail(email){
    const recipients = [{email}]
    try {
        await mailClient.send({
            from: sender,
            to: recipients,
            subject: 'Password reset successfull',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Password Reset'
        })
    } catch (e) {
        console.error('Error sendong email : ', e)
        throw new Error(`Error : ${e}`)
    }
}