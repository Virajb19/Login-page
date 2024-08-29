import { useGSAP } from '@gsap/react'
import Input from '../components/Input'
import { User , Mail , Lock,} from 'lucide-react'
import gsap from 'gsap'
import { useState } from 'react'
import PasswordCriteria, { PasswordStrengthMeter } from '../components/PasswordStrengthMeter'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../config.js'

export default function SignUpPage() {

 const [username, setUsername] = useState("")
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")

 const navigate = useNavigate()

  useGSAP(() => {
    gsap.from('#signupPage', {
      y: 100,
      opacity: 0,
      duration: 0.6,
      delay: 0.1
    })
  })

  const inputs = [
    {text: 'Full Name', icon: <User size={25} />, onChange: e => setUsername(e.target.value)} , 
    {text: 'Email Address', icon: <Mail size={25}/>, onChange: e => setEmail(e.target.value)}, 
    {text: 'Password', icon: <Lock size={25}/>, onChange: e => setPassword(e.target.value)}
  ]

  return (
    <div id='signupPage' className='bg-[#193A32] w-[26%] flex flex-col gap-1 rounded-2xl'>
          <span className='text-3xl text-[#4DCF87] font-semibold flex justify-center p-1 mb-[1rem] mt-[2rem]'>Create Account</span>
          <div id='inputs' className='flex flex-col p-1 gap-[2rem] mx-[2rem]'>
             {inputs.map((input,i) => {
              return <Input key={i} text={input.text} icon={input.icon} id={`inputBox-${i + 1}`} onChange={input.onChange}/>
             })}
          </div>
          <PasswordStrengthMeter password={password} />
          <PasswordCriteria password={password} />
          <button onClick={async () => {
            try {
              const res = await axios.post(`${BACKEND_URL}/api/auth/signup/`, {
                username,
                email,
                password
             })
             console.log(res)
             localStorage.setItem('userData', JSON.stringify(res.data))
            } catch(e) {
               console.error('Error signing up : ', e)
            }
           if(username && email && password) navigate('/verify-email')

          }} className='bg-[#078255] rounded-lg text-white text-xl font-semibold py-[0.7rem] mx-[2rem] mt-[0.5rem] hover:scale-95'>Sign Up</button>
          <div id='bottom' className='bg-[#0E1F22] rounded-b-2xl flex p-[1rem] gap-1 justify-center mt-[2rem]'>
            <span className='text-gray-400'>Already have an account?</span>
            <Link to={'/signin'} className='text-green-500 hover:underline'>Login</Link>
          </div>
    </div>
  )
}

