"use client";
import Link from 'next/link';
import React, {useEffect} from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import toast from 'react-hot-toast';



export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login Success", response.data)
            toast.success("Login success");
            router.push("/profile");
        
        } catch(error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=> {
        if(user.email.length > 0 && user.password.length >0)
        {
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user]);

    

    return(
        <div className="flex items-center justify-center min-h-screen">

            <div className="flex flex-col items-center p-8 border border-gray-400 rounded-lg shadow-white">

            <h1 className='font-bold p-2 text-2xl'>
                { loading ? "Processing" : "Login"}
            </h1>
            <hr />

            <label htmlFor="email" className='p-2'>email</label>
            <input className='p-2 border bordey-gray-300 rounded-lg
            mb-4 focus:outline-none focus:border-gray-600 text-black'
                id="email"
                type="text" 
                value={user.email}
                onChange={(e) => setUser({...user, email:e.target.value})}
                placeholder='email'
                />

            <label htmlFor="password" className='p-2 '>password</label>
            <input className='p-2 border bordey-gray-300 rounded-lg
            mb-4 focus:outline-none focus:border-gray-600 text-black'
                id="password"
                type="password" 
                value={user.password}
                onChange={(e) => setUser({...user, password:e.target.value})}
                placeholder='password'
                />

                <button 
                onClick={onLogin}
                className={`p-2 w-36 border border-gray-300 rounded-lg mb-4 focus:outline-none ${buttonDisabled ? "bg-black" : "bg-black text-white hover:bg-gray-500"}`}
                disabled={buttonDisabled}>
                    Login</button>

                <div className='flex space-x-4'>
                    <div className='border border-gray-400 px-1 py-1 rounded-lg hover:bg-gray-500 hover:text-white'>
                    <Link href="/signup">Signup Here</Link>
                    </div>

                    <div className='group border border-gray-400 px-1 py-1 rounded-lg hover:bg-gray-500 hover:text-white'>
                    <Link href="/forgotpassword" className=''>Forgot Password</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
