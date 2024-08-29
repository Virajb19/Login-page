import FloatingShape from "./components/FloatingShape";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import SignUpPage from "./pages/SignUpPage";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function App(){ // USE jsx snippet

 return <div className="w-full min-h-screen overflow-auto bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex justify-center items-center">
        <FloatingShape color='bg-green-500' size='w-64 h-64' delay={0} top='top-[-5%]' left='left-[10%]'/>
        <FloatingShape color='bg-emerald-500' size='w-48 h-48' delay={5} top='top-[70%]' left='left-[80%]'/>
        <FloatingShape color='bg-lime-500' size='w-32 h-32' delay={2} top='top-[40%]' left='left-[-10%]' />
    
        <BrowserRouter>
           <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/signup" element={<SignUpPage />}/>
            <Route path="/signin" element={<Login />}/>
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />}/>
           </Routes>
        </BrowserRouter>

        <Toaster />
 </div>
}
