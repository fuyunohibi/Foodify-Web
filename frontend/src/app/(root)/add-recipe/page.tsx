"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { FloatingDockTabs } from "@/components/ui/floating-dock-tabs";
import { Logo } from "@/components/ui/logo";

import { motion } from "framer-motion";
import { RecipeFormData } from "@/types/recipe";
import RecipeForm from "@/components/recipes/recipe-form";

const AddRecipePage = () => {
  const handleSubmit = (data: RecipeFormData) => {
    console.log("Recipe submitted", data);
  };

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
        className="relative flex justify-center flex-1 w-screen flex-col p-16 pb-36"
      >
        <RecipeForm onSubmit={handleSubmit} />
      </motion.div>
      <FloatingDockTabs />
    </AuroraBackground>
  );
};

export default AddRecipePage;
