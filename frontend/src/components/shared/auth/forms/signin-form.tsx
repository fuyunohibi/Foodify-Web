"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // const res = await signIn("credentials", {
    //   redirect: false,
    //   email,
    //   password,
    // });

    // if (res?.error) {
    //   setError("Invalid credentials");
    // } else {
    //   window.location.href = "/";
    // }

    try {
      const response = await fetch("http://localhost:5001/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
      } else {
        const result = await response.json();
        console.log("User logged in successfully:", result);
        setError("");
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An unexpected error occurred.");
    }
  };
  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-7 p-6">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSignIn}>
        <label className="text-lg font-medium text-gray-900">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 mb-4 w-full p-3 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <label className="text-lg font-medium text-gray-900">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 mb-4 w-full p-3 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Link href={"/home"}>
          <button className="mt-6 py-3 px-6 bg-gradient-to-tr from-gray-700 to-gray-900 text-white rounded-3xl font-bold w-full transition-all duration-500 hover:from-gray-700 hover:to-black hover:scale-105">
            Log in
          </button>
        </Link>
      </form>
    </div>
  );
}
