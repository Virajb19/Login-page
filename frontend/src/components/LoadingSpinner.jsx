import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function LoadingSpinner() {

    useGSAP(() => {
        gsap.to('#spinner', {
            rotate: 360,
            duration: 1,
            ease: 'linear',
            repeat: -1
        })
    })

    return <div className="bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex justify-center items-center">
             <div id="spinner" className="size-16 border-t-4 border-t-green-500 rounded-full"></div>
        </div>
}