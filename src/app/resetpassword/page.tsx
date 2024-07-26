"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try{
        const urlToken = searchParams.get('token');
        if (urlToken) {
            setToken(urlToken);
        } else {
            toast.error("Invalid or missing token");
            router.push("/login");
        }
        } catch (error) {
        console.error("Error in useEffect:", error);
        toast.error("An error occurred while processing the token");
    }
    }, [searchParams, router]);

    const onSubmit = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetpassword", { token, password });
            toast.success("Password reset successfully");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center p-8 border border-gray-400 rounded-lg shadow-white">
                <h1 className="font-bold p-2 text-2xl">
                    {loading ? "Processing" : "Reset Password"}
                </h1>
                <hr />

                <h2 className="p-2 m-2 bg-amber-100 text-black rounded-lg">
                    {token ? `Token: ${token}` : "No token"}
                </h2>

                <label htmlFor="password" className="p-2">New Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                />

                <label htmlFor="confirmPassword" className="p-2">Confirm New Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                />

                <button
                    onClick={onSubmit}
                    className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none ${loading ? "bg-gray-500" : "bg-black text-white hover:bg-gray-500"}`}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Submit"}
                </button>
            </div>
        </div>
    );
}
