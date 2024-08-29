import clsx from 'clsx'
import { useRef, useState } from 'react'

export default function Input({icon, text ,id , onChange}) {

    const [isFocus, setIsFocus] = useState(false) // CLASS CONFLICT 

    return <div id={id} className={clsx("flex p-1 gap-3 bg-[#1D3234] rounded-lg", isFocus ? "border-2 border-green-600" : "border border-zinc-600")}>
        <div className="text-[#4B9B70] text-xl flex items-center ml-2">{icon}</div>
        <input onChange={onChange} onBlur={() => setIsFocus(false)} onFocus={() => setIsFocus(true)} className="bg-transparent grow p-1 text-lg focus:outline-none text-gray-200" type={text.includes('Password') ? "password" : "text"} placeholder={text}/>
    </div>
}