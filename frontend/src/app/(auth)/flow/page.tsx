"use client";

import SignInForm from "@/components/shared/auth/forms/signin-form";
import SignUpForm from "@/components/shared/auth/forms/signup-form";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FlowPage = () => {
  const [signIn, setSignIn] = useState(true);
  const [overlayZIndex, setOverlayZIndex] = useState(1); 

  const handleToggleAuth = () => {  
    setSignIn(!signIn);
  }

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center h-screen"
      >
        <div className="glassmorphism-auth flex overflow-hidden w-[60rem] h-[40rem]">
          {/* Sign Up Form */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: signIn ? "0%" : "100%", opacity: signIn ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-0 left-0 w-1/2 h-full p-8 flex flex-col justify-center items-center${
              signIn ? "hidden" : "block"
            }`}
            style={{ zIndex: signIn ? 0 : 2 }}
          >
            <SignUpForm />
          </motion.div>

          {/* Sign In Form */}
          <motion.div
            initial={{ x: signIn ? "0%" : "-100%", opacity: signIn ? 1 : 0 }}
            animate={{ x: signIn ? "0%" : "100%", opacity: signIn ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-0 left-0 w-1/2 h-full p-8 flex flex-col justify-center items-center${
              signIn ? "block" : "hidden"
            }`}
            style={{ zIndex: signIn ? 2 : 0 }}
          >
            <SignInForm />
          </motion.div>

          {/* Overlay Container */}
          <motion.div
            initial={{ x: signIn ? "0%" : "-100%" }}
            animate={{ x: signIn ? "0%" : "-50%" }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center"
            style={{ zIndex: overlayZIndex }}
            onAnimationStart={() => setOverlayZIndex(10)}
            onAnimationComplete={() => setOverlayZIndex(1)}
          >
            <div className="absolute top-0 left-1/2 w-1/2 h-full text-white flex items-center justify-center align-middle">
              <div className="flex flex-1 w-[50%]">
                <Image
                  src="https://images.unsplash.com/photo-1533639781336-c2a9bb73a00a?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  layout="fill"
                  className="object-cover"
                  alt="Hero Image"
                />
              </div>
              <div className="relative z-10 p-8 text-center">
                <h1 className="text-3xl font-bold mb-4">
                  {signIn ? "Welcome Back" : "Create an Account"}
                </h1>
                <p className="mb-4">
                  {signIn
                    ? "Log in to your account and let's create some magic"
                    : "Sign up to create an account and let's get started"}
                </p>
                <button
                  onClick={handleToggleAuth}
                  className="border-2 border-white py-2 px-6 text-white rounded-lg hover:bg-white hover:text-black transition-all duration-500"
                >
                  {signIn ? "Sign Up" : "Log In"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default FlowPage;
