"use client";
import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() =>{
        const urlToken= window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() =>{
        if(token.length>0){
            verifyUserEmail();
        }
    }, [ token ]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold ">Verify Email</h1>
            <h2 className="p-2 m-2 bg-amber-100 text-black rounded-lg"> {token  ? `${token}`: "no token"} </h2>

            {verified && (
                <div>
                    <h2 className="p-2 text-2xl">Email Verified</h2>

                    <div className='p-2 border border-gray-400 px-1 py-1 rounded-lg hover:bg-gray-500 text-center'>
                    <Link href="/login" className="p-2 ">
                    Login</Link>
                    </div>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 p-2 m-2 text-black rounded-lg">Error</h2>
                </div>
            )}
        
        </div>
    )
}