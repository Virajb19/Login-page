import clsx from "clsx"
import { Check , X } from "lucide-react"

export default function PasswordCriteria({password}) {

    const criteria = [
        {label: 'At least 6 characters', met: password.length >= 6},
        {label: 'Containes uppercase Letter', met: /[A-Z]/.test(password)},
        {label: 'Containes lowercase Letter', met: /[a-z]/.test(password)},
        {label: 'Contains a number', met: /\d/.test(password)},
        {label: 'Contains a special character', met: /[^A-Za-z0-9]/.test(password)}
    ]

    return <div className="p-1 flex flex-col mx-[2rem]">
             {criteria.map((item,i) => {
                return <div key={i} className="flex p-1 gap-2">
                  {item.met ? <Check className="text-green-400" /> : <X className="text-gray-600"/>}
                  <span className={clsx(item.met ? "text-green-400" : "text-[#7F938F]")}>{item.label}</span>
                </div>
             })}
        </div>
}

export function PasswordStrengthMeter({password}) {

    function getStrength(p) {
        let strength = 0

        if(p.length >= 6) strength++
        if(p.match(/[a-z]/) && p.match(/[A-Z]/)) strength++
        if(p.match(/\d/)) strength++
        if(p.match(/[^A-Za-z0-9]/)) strength++

        return strength
    }

    function getStrengthText(strength){
        if(strength == 0) return 'Very weak'
        else if(strength == 1) return 'Weak'
        else if(strength == 2) return 'Fair'
        else if(strength == 3) return 'Good'
        else return 'Strong'
    }

    function getColor(strength){
        if(strength == 1) return 'bg-red-400'
        else if(strength == 2) return 'bg-yellow-400'
        else if(strength == 3) return 'bg-yellow-500'
        else return 'bg-green-500'
    }
     
    const strength = getStrength(password)
     
    return <div className="flex flex-col p-1 mx-[2rem] gap-1 mt-[1rem]">
             <div className="text-[#7F938F] flex justify-between">
               <span>Password Strength</span>
               <span>{getStrengthText(strength)}</span>
             </div>
             <div id="meters" className="p-1 flex h-[0.8em] gap-2">
               {Array(4).fill(null).map((_,i) => {
                return <div key={i} className={clsx("basis-1/4 h-full rounded-full transition-colors duration-300", i < strength ? getColor(strength) : "bg-[#495460]")}></div>
               })}
             </div>
        </div>
}