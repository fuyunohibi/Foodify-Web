import React from "react";

interface FoodCardProps {
  title: string;
  calories: number;
  grams: number;
  category: string;
  image: string;
}

const FoodCard = ({ title, calories, grams, category, image }: FoodCardProps) => {
  return <div className="rounded-3xl w-64 h-52">
    
  </div>;
};

export default FoodCard;
