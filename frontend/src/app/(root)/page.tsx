"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import Link from "next/link";

const IntroductionPage = () => {
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
        className="relative flex flex-col gap-4 items-center justify-center px-4 h-screen"
      >
        <div className="text-3xl md:text-7xl font-bold text-white text-center">
          The Taste of Yesterday
        </div>
        <div className="font-extralight text-base md:text-xl text-neutral-200 py-4">
          Write down your recipes and share them with the world.
        </div>
        <Link href="/home">
          <button className="bg-black rounded-full w-fit text-white  px-4 py-2 transition-all duration-500 hover:bg-gray-800 dark:hover:bg-gray-300 hover:scale-105">
            Get Started
          </button>
        </Link>
      </motion.div>
    </AuroraBackground>
  );
};

export default IntroductionPage;
