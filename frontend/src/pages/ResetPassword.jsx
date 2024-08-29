import { useState } from "react";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPassword() {
 
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const { token } = useParams()

    useGSAP(() => {
        gsap.from('#reset-password', {
            opacity: 0,
            y: 50, 
            duration: 0.4,
            ease: 'linear'
        })
    })

   async function handleOnClick(){
        try {
            const res = await axios.post(`${BACKEND_URL}/api/auth/reset-password/${token}`, {password: newPassword})
            toast.success(res.data.msg)
        } catch(err) {
            toast.error(err.res?.data?.msg || 'Error occurred while resetting password')
        }
    }
  
    return <div id="reset-password" className="w-[25%] bg-[#1B3E31] rounded-xl p-1 flex flex-col">
             <span className="text-3xl text-[#3EB485] font-semibold flex justify-center mt-[1em]">Reset Password</span>
             <div className="m-[2em] flex flex-col gap-7">
                <Input icon={<Lock />} text="old Password" onChange={e => setOldPassword(e.target.value)}/>
                <Input icon={<Lock />} text="New Password" onChange={e => setNewPassword(e.target.value)}/>
             </div>
             <button onClick={handleOnClick} className="bg-gradient-to-r from-green-600 via-green-500 to-green-800 p-3 mx-[2rem] rounded-lg text-xl text-gray-300 font-semibold mb-[1.5em] hover:scale-95">Set new Password</button>
        </div>
}