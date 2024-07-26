"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onForgotPassword = async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/forgotpassword", { email });
            toast.success('Password reset link sent to your email.');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center p-8 border border-gray-400 rounded-lg shadow-white">
                <h1 className='font-bold p-2 text-2xl'>
                    {loading ? "Processing" : "Forgot Password"}
                </h1>
                <hr />
                <label htmlFor="email" className='p-2'>Email</label>
                <input className='p-2 border bordey-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                />
                <button 
                    onClick={onForgotPassword}
                    className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none ${buttonDisabled ? "bg-black" : "bg-black text-white hover:bg-gray-500"}`}
                    disabled={buttonDisabled}>
                    Submit
                </button>
                <div className='border border-gray-400 px-1 py-1 rounded-lg hover:bg-gray-500'>
                    <Link href="/login">Back to Login</Link>
                </div>
            </div>
        </div>
    );
}
