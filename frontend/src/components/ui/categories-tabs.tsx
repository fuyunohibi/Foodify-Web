"use client";

import Image from "next/image";
import { Tabs } from "../ui/tabs";
import FoodCard from "../shared/cards/food-card";
// import { recipes } from "@/constants/recipe";
import { RecipeData } from "@/types/recipe";

interface CategoriesTabsProps {
  recipes: RecipeData[];
}

export function CategoriesTabs ({ recipes }: CategoriesTabsProps) {

  const tabs = [
    {
      title: "All",
      value: "all",
      content: (
        <div className="-mt-[3rem] w-full min-h-[23rem] overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-2xl font-bold text-white bg-gradient-to-br from-[#12100E] to-[#2B4162]">
          <p className="mb-[1rem]">All</p>
          <div className="flex w-full overflow-x-auto space-x-4 no-scrollbar">
            {recipes.map((recipe, index) => (
              <FoodCard key={index} recipe={recipe} />
            ))}
          </div>
          {/* <DummyContent /> */}
        </div>
      ),
    },
    {
      title: "Breakfast",
      value: "breakfast",
      content: (
        <div className="-mt-[3rem] w-full min-h-[23rem] overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-2xl font-bold text-white bg-gradient-to-br from-[#12100E] to-[#2B4162]">
          <p className="mb-[1rem]">Breakfast</p>
          {/* <DummyContent /> */}
        </div>
      ),
    },
    {
      title: "Desserts",
      value: "desserts",
      content: (
        <div className="-mt-[3rem] w-full min-h-[23rem] overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-2xl font-bold text-white bg-gradient-to-br from-[#12100E] to-[#2B4162]">
          <p className="mb-[1rem]">Desserts</p>
          {/* <DummyContent /> */}
        </div>
      ),
    },
    {
      title: "Pizza",
      value: "pizza",
      content: (
        <div className="-mt-[3rem] w-full min-h-[23rem] overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-2xl font-bold text-white bg-gradient-to-br from-[#12100E] to-[#2B4162]">
          <p className="mb-[1rem]">Healthy</p>
          {/* <DummyContent /> */}
        </div>
      ),
    },
    {
      title: "Pasta",
      value: "pasta",
      content: (
        <div className="-mt-[3rem] w-full min-h-[23rem] overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-2xl font-bold text-white bg-gradient-to-br from-[#12100E] to-[#2B4162]">
          <p className="mb-[1rem]">Pasta</p>
          {/* <DummyContent /> */}
        </div>
      ),
    },
    {
      title: "Healthy",
      value: "healthy",
      content: (
        <div className="-mt-[3rem] w-full min-h-[23rem] overflow-hidden relative h-full rounded-2xl p-6 text-xl md:text-2xl font-bold text-white bg-gradient-to-br from-[#12100E] to-[#2B4162]">
          <p className="mb-[1rem]">Healthy</p>
          {/* <DummyContent /> */}
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start mt-6">
      <Tabs tabs={tabs} />
    </div>
  );
}