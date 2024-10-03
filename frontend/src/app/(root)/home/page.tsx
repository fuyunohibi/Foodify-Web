"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { FloatingDockTabs } from "@/components/ui/floating-dock-tabs";
import { Logo } from "@/components/ui/logo";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const HomePage = () => {
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
        className="relative flex flex-1 w-screen flex-col gap-4 p-10"
      >
        <Logo />
        <div className="mt-[5rem]">
          <p className="text-lg font-bold text-white">Categories</p>
        </div>
        <div className="mt-[8rem]">
          <p className="text-lg font-bold text-white">Popular</p>
        </div>
      </motion.div>
      <FloatingDockTabs />
    </AuroraBackground>
  );
};

export default HomePage;
