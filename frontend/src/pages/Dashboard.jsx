import { useGSAP } from "@gsap/react"
import axios from "axios"
import gsap from "gsap"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {

    const user = JSON.parse(localStorage.getItem('userData')).user
    const navigate = useNavigate()

    useGSAP(() => {

      const tl = gsap.timeline()

       tl.from('#dashboard', {
         opacity: 0.2,
         x: 100,
         duration: 0.4,
         ease: 'linear'
       })

        tl.from('#dashboard .box', {
            opacity: 0,
            y: 50,
            duration: 0.5,
            scale: 0.9
        })
    })

    return <div id="dashboard" className="flex flex-col p-1 bg-[#122427] w-[26%] gap-1 rounded-xl">
            <span className="text-3xl font-semibold text-[#2CBA79] flex justify-center mt-[1em] mb-[0.8em]">Dashboard</span>
            <Box heading="Profile information" userData={[{label : 'Name', value: user.username}, {label: 'Email', value: user.email}]} />
            <Box heading="Account Activity" userData={[{label: 'Joined', value: user.createdAt} , {label: 'Last Login', value: user.lastlogin}]}/>
            <button onClick={async () => {
                await axios.post(`${BACKEND_URL}/api/auth/signout/`)
                navigate('/signin')
            }} className="text-xl text-gray-100 bg-gradient-to-r from-green-300 via-green-500 to-green-800 rounded-lg p-4 mx-[2em] hover:scale-95 mb-[1em] font-medium">Logout</button>
        </div>
}

function Box({heading , userData}){
    return  <div className="box flex flex-col p-5 bg-[#192631] mx-[7%] border border-zinc-700 rounded-lg mb-[2em]">
    <span className="text-[#70CC9B] text-2xl mb-[1em]">{heading}</span>
    {userData.map((data,i) => {
        return <p key={i} className="text-gray-300 text-lg">{data.label} : {data.value}</p>
    })}
  </div>
}