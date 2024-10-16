"use client";

import { useEffect, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { CategoriesTabs } from "@/components/ui/categories-tabs";
import { FloatingDockTabs } from "@/components/ui/floating-dock-tabs";
import { Logo } from "@/components/ui/logo";
import { motion } from "framer-motion";
import Link from "next/link";
import { RecipeData } from "@/types/recipe";

const HomePage = () => {
  const [recipes, setRecipes] = useState<RecipeData[] | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`http://localhost:5001/recipes`);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipes();
  }, []);

  if (!recipes) {
    return <div>Loading...</div>;
  }

  const sortedRecipes: RecipeData[] = recipes.sort((a: RecipeData, b: RecipeData) => {
    return a.title.localeCompare(b.title);
  });
  console.log("SORTED RECIPES:", sortedRecipes);

  
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
        <Logo />
        <div className="-mt-[8rem]">
          <p className="text-lg font-bold text-white">Categories</p>
          <CategoriesTabs recipes={sortedRecipes} />
        </div>
      </motion.div>
      <FloatingDockTabs />
    </AuroraBackground>
  );
};

export default HomePage;
