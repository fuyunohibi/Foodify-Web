"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { CategoriesTabs } from "@/components/ui/categories-tabs";
import { FloatingDockTabs } from "@/components/ui/floating-dock-tabs";
import { Logo } from "@/components/ui/logo";
import { motion } from "framer-motion";
import Link from "next/link";

interface IParams {
  params: {
    id: string;
  };
}

const ReceipesPage = ({ params }: IParams) => {

  console.log("ID:", params.id);
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
        className="relative flex flex-1 w-screen flex-col gap-4 p-10 min-h-screen"
      >
        <p className="text-lg font-bold text-white">Recipe</p>
        <p className="text-lg font-bold text-white">{params.id}</p>
      </motion.div>
      <FloatingDockTabs />
    </AuroraBackground>
  );
};

export default ReceipesPage;
