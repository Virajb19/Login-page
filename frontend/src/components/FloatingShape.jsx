import clsx from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

export default function FloatingShape({color, size , delay, top, left}){

    const shapeRef = useRef(null)

    useGSAP(() => {
        gsap.to(shapeRef.current, { 
            x: delay === 5 ? '-70vw' : '70vw',
            y: delay === 5 ? '-70vh' : '70vw',
            duration: 25,
            ease: 'linear',
            rotate: 360,
            repeat: -1,
            delay
        })
    })

    return <div ref={shapeRef} id='shape' className={clsx("absolute rounded-full opacity-20 blur-xl", color, size, top, left)} aria-hidden="true">
    </div>
}