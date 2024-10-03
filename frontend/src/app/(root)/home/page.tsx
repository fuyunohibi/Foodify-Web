"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { FloatingDockTabs } from "@/components/ui/floating-dock-tabs";
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
        <div className="text-xl md:text-2xl font-bold dark:text-white text-left">
          The Taste of Yesterday
        </div>
      </motion.div>
      <FloatingDockTabs />
    </AuroraBackground>
  );
};

export default HomePage;
