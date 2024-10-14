"use client";

import { useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FloatingDockTabs } from "@/components/ui/floating-dock-tabs";
import { Logo } from "@/components/ui/logo";
import { motion } from "framer-motion";
import { RecipeFormData } from "@/types/recipe";
import RecipeForm from "@/components/recipes/recipe-form";
import { useRouter } from "next/navigation";

const AddRecipePage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: RecipeFormData) => {
    try {
      const response = await fetch("http://localhost:5000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
      } else {
        const result = await response.json();
        console.log("Recipe added successfully:", result);
        setErrorMessage(null);
        router.push("/home");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      setErrorMessage("An unexpected error occurred.");
    }
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
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <RecipeForm onSubmit={handleSubmit} />
      </motion.div>
      <FloatingDockTabs />
    </AuroraBackground>
  );
};

export default AddRecipePage;
