"use client"; // Client-side component

import { useEffect, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FloatingDockTabs } from "@/components/ui/floating-dock-tabs";
import { motion } from "framer-motion";
import BoltIcon from '@/components/ui/bolt-icon'
import ClockIcon from "@/components/ui/clock-icon";
import ThumbUpIcon from "@/components/ui/thumb-up";
import Image from "next/image";

interface Recipe {
  id: number;
  author: string;
  authorAvatar: string;
  calories: number;
  date: string;
  description: string;
  duration: string;
  image: string;
  level: string;
  steps: string[];
  title: string;
}

interface StepProps {
  text: string;
}

const Step = ({ text }: StepProps) => {
  const [isDone, setIsDone] = useState(false);
  return (
    <div onClick={() => setIsDone((d) => !d)}>
      <a
        className={`text-md font-medium cursor-pointer ${
          isDone ? "line-through text-red-400" : ""
        }`}
      >
        {text}
      </a>
    </div>
  );
};

interface RecipeDetailsProps {
  id: string;
}

const RecipeDetails = ({ id }: RecipeDetailsProps) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:5000/recipes/${id}`);
        const data: Recipe = await res.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
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
        className="relative flex flex-1 w-screen flex-col gap-4 p-10 min-h-screen text-black items-center mb-16"
      >
        <div className="flex items-center flex-col space-y-4">
          <h1 className=" font-bold text-4xl">{recipe.title}</h1>
          <div className="relative">
            <Image src={recipe.image} alt='food' className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px]"></Image>
            <Image src={recipe.authorAvatar} alt='author' className="w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] rounded-full absolute -bottom-4 -right-4"></Image>
          </div>
          <a className="text-md font-light"> recipe by {recipe.author}</a>
          <a className="text-lg font-normal sm:w-[500px]">{recipe.description}</a>
          <div className="w-full h-[150px] rounded-xl border bg-none flex items-center justify-between px-2">
            <div className="rounded-full w-[70px] h-[70px] flex items-center justify-center flex-col">
              <ClockIcon/>
              <a className="text-md text-orange-400">{recipe.duration}</a>
            </div>
            <div className="rounded-full w-[70px] h-[70px] flex items-center justify-center flex-col">
              <ThumbUpIcon/>
              <a className="text-md text-orange-400">{recipe.level}</a>
            </div>
            <div className="rounded-full w-[70px] h-[70px] flex items-center justify-center flex-col">
              <BoltIcon/>
              <a className="text-md text-orange-400">1000000</a>
              <a className="tex-md text-orange-400">cal</a>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full flex items-start">
              <a className="text-lg font-semibold">Direction</a>
            </div>
            <ul className="flex flex-col mt-2">
              {recipe.steps.map((item, index) => <Step text={`${index + 1}. ${item}`} key={index}/>)}
            </ul>
          </div>
        </div>
      </motion.div>
      <FloatingDockTabs />
    </AuroraBackground>
  );
};

export default RecipeDetails;
