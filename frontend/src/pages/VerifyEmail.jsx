import { useEffect, useRef, useState } from "react"

export default function VerifyEmail() {

     const [code,setCode] = useState(new Array(6).fill(""))
     const inputRefs = useRef([])

     function handleOnChange(e,i) {
        const value = e.target.value

        if(/^\d$/.test(value)) {
           const newCode = [...code]
           newCode[i] = value
           setCode(newCode)
           if(i < 5) inputRefs.current[i + 1].focus()
        }
       else e.target.value = ""
     }
     
     function handleOnKeyUp(e,i){ // SYNCRONIZE THE STATE CODE AND THE INPUT VALUES
        if(e.key === 'Backspace'){
            const newCode = [...code]
            newCode[i] = ""
            setCode(newCode)

            //console.log(code)

           if(i > 0 && !code[i]) inputRefs.current[i - 1].focus() // inputsRef.current[i].value === ""
        }
     }

     function handleOnKeyDown(e,i) {
        if(e.key === 'ArrowRight' && i < 5) inputRefs.current[i + 1].focus()
        else if(e.key === 'ArrowLeft' && i > 0) inputRefs.current[i - 1].focus()
     }

    function handleClick(){
        if(code.every(d => d != "")) {
            const verificationCode = code.join('')
             setTimeout(() => {
              alert(`Verification code submitted : ${verificationCode}`)
             }, 300)
           }
    }

    useEffect(() => {
       if(code.every(d => d != "")) handleClick()
    }, [code])

    return <div className="bg-[#193A32] w-[25vw] p-2 flex flex-col gap-1 rounded-2xl">
            <span className="text-[#3EB485] text-3xl font-semibold flex justify-center my-[1em]">Verify your email</span>
            <p className="text-gray-300 flex justify-center">Enter the 6-digit code sent to your email address.</p>
            <div id="code" className="flex p-1 gap-1 justify-around my-[1em] mx-[1.2em]">
                {code.map((digit,i) => {
                    return <input key={i} ref={el => inputRefs.current[i] = el}
                    value={digit}
                    onChange={e => handleOnChange(e,i)}
                    onKeyUp={e => handleOnKeyUp(e,i)}
                    onKeyDown={e => handleOnKeyDown(e,i)}
                    maxLength={1}
                    className="size-12 rounded-lg focus:outline-none bg-[#374151] border border-zinc-500 focus:border-green-600 focus:border-2 duration-75 text-gray-300 text-center text-2xl font-bold" />
                })}
            </div>
            <button onClick={handleClick} className="bg-gradient-to-r from-[#078255] to-green-500 text-white text-xl font-semibold rounded-lg p-3 mx-[1.5em] mb-[1.5em] hover:scale-95">Verify Email</button>
        </div>
}