import { useState } from "react";
import Input from "../components/Input";
import { Mail, Lock } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

export default function Login() {

   const [email,setEmail] = useState("")
   const [password,setPassword] = useState("")

   useGSAP(() => {
     gsap.from('#login', {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: 'linear'
     })
   })

    return <div id="login" className="bg-[#1B3E31] w-[25%] flex flex-col gap-1 rounded-xl">
            <span className="text-[#3EB485] text-3xl font-semibold mt-[2rem] flex justify-center p-1">Welcome back</span>
            <div className="flex flex-col p-1 gap-[2rem] mt-[1rem] mx-[1.5rem] mb-[1rem]">
            <Input icon={<Mail />} text="Email Address" onChange={e => setEmail(e.target.value)}/>
            <Input icon={<Lock />} text="Password" onChange={e => setPassword(e.target.value)}/>
            </div>
            <Link to={'/forgot-password'} className="text-green-500 ml-[1.5rem] mb-[1rem]">Forgot Password?</Link>
            <button className="bg-gradient-to-r from-[#078255] to-green-400 text-white text-xl rounded-lg font-semibold p-3 mb-[2rem] mx-[1.5rem] hover:scale-95">Login</button>
            <div className="bg-[#0E1F22] text-gray-400 flex justify-center gap-1 p-[1rem] rounded-b-xl text-sm">
               <span>Don't have an account?</span>
               <Link to={'/signup'} className="text-green-500">Sign up</Link>
            </div>
        </div>
}