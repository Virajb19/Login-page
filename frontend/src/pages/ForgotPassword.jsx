import { Link } from "react-router-dom";
import Input from "../components/Input";
import { Mail, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function ForgotPassword() {

    const [email,setEmail] = useState("") // SYNCRONIZE THE STATE VARIABLE AND INPUT   ( TEXT CENTER ) STATE SYNCRONIZATION  (W-FIT H-FIT)
    const [isSubmitted, setIsSubmitted] = useState(false)

    useGSAP(() => {
       const anime =  gsap.from('#forgot-password', {
            opacity: 0,
            duration: 0.9,
            y: -100,
            ease: 'power2.out',
        })

        return () => anime.kill()
    })

    return <div id="forgot-password" className="bg-[#193D30] flex flex-col w-[25%] rounded-xl"> 
            <span className="text-[#3EB485] text-3xl font-semibold flex justify-center my-[0.8em]">Forgot Password</span>

            {isSubmitted ? (<div className="flex flex-col p-1 gap-[2em] items-center mb-[3em]">
                <div className="bg-[#22C55F] w-fit p-5 rounded-full"><Mail className="text-zinc-300" size={45}/></div>
                <p className="text-lg text-zinc-300 text-center">If an account exists for {email}, <br />you will receive a password reset link shortly</p>
            </div>) : (
            <>
            <p className="text-gray-300 p-1 flex flex-col mb-[2em] text-center">Enter your email address and we'll send you a link to <br /> reset your password.</p>
            <div className="mx-[7%] p-0.5 mb-[2em]">
            <Input icon={<Mail />} text="Email" onChange={e => setEmail(e.target.value)}/>
            </div>
            <button onClick={async () => {
                if(!email) return alert('Please provide email first')
                await axios.post(`${BACKEND_URL}/api/auth/forgot-password`, {email})
                setIsSubmitted(true)
            }} className="bg-gradient-to-r from-green-400 to-green-800 p-3 text-zinc-200 text-xl font-semibold mx-[7%] rounded-xl mb-[2em] hover:scale-95">Send Reset Link</button>
            </>
            )}

            <div className="bg-[#152528] rounded-b-xl text-[#398C58] flex justify-center items-center gap-2 p-3">
               <ArrowLeft size={20} />
               <Link className="hover:underline" to={'/signin'}>Back to login</Link>
            </div>
        </div>
}