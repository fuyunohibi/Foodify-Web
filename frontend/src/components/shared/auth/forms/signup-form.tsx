"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileUpload } from "@/components/ui/file-upload";
import { IconArrowLeft } from "@tabler/icons-react";

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleUpload = (files: File[]) => {
    setFile(files[0]);
    console.log("FILE UPLOADED:", files[0]);
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/";
    }
  };
  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-7 p-6">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSignIn}>
        {step === 1 ? (
          <>
            <label className=" text-lg font-medium text-gray-900">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 mb-4 w-full p-3 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label className=" text-lg font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 mb-4 w-full p-3 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => setStep(2)}
              className="mt-6 py-3 px-6 bg-gradient-to-tr from-gray-700 to-gray-900 text-white rounded-3xl font-bold w-full transition-all duration-500 hover:from-gray-700 hover:to-black hover:scale-105"
            >
              Next
            </button>
          </>
        ) : (
          <div className="gap-4 w-[23rem]">
            <button className="absolute top-10 left-6 flex justify-center items-center w-12 h-12 border-2 text-white border-white rounded-full hover:bg-white hover:text-black transtition-all duration-500 group">
              <IconArrowLeft
                className="w-6 h-6 group-hover:-translate-x-1 transition-all duration-300"
                onClick={() => setStep(1)}
              />
            </button>
            <FileUpload onChange={handleUpload} />
            <input
              type="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-4 w-full p-3 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Link href={"/home"}>
              <button className="mt-6 py-3 px-6 bg-gradient-to-tr from-gray-700 to-gray-900 text-white rounded-3xl font-bold w-full transition-all duration-500 hover:from-gray-700 hover:to-black hover:scale-105">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
}
