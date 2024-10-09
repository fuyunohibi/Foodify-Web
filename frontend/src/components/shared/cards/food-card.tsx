interface FoodCardProps {
  title: string;
  calories: number;
  grams: number;
  category: string;
  image: string;
}

import Image from "next/image";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import {
  IconClock,
  IconFlame,
  IconStar,
  IconTimeDuration0,
} from "@tabler/icons-react";
import Link from "next/link";

interface FoodCard {
  recipe: {
    id: string;
    author: string;
    date: string;
    title: string;
    description: string;
    duration: string;
    level: string;
    calories: number;
    image: string;
    authorAvatar: string;
    steps: string[];
  };
}

export function FoodCard({ recipe }: FoodCard) {
  return (
    <div className="md:w-[25rem] mx-auto mr-1">
      <Link href={`/recipes/${recipe.id}`}>
        <FollowerPointerCard
          title={
            <TitleComponent
              title={recipe.author}
              avatar={recipe.authorAvatar}
            />
          }
        >
          <div className="flex flex-col relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
            <Image
              src={recipe.image}
              alt="thumbnail"
              layout="fill"
              objectFit="cover"
              className={`group-hover:scale-95 group-hover:rounded-2xl transform object-cover transition duration-200`}
            />
            <div className="flex flex-col p-4 relative z-10">
              <h2 className="font-bold my-4 text-lg text-zinc-700">
                {recipe.title}
              </h2>
              <h2 className="font-normal my-4 text-sm text-zinc-500">
                {recipe.description}
              </h2>
              <div className="flex flex-row justify-start items-center gap-1 mt-10">
                <div className="relative z-10 h-8 flex flex-row justify-center items-center gap-1 px-6 py-2 glassmorphism text-black font-bold rounded-[3rem] text-xs">
                  <IconClock className="h-[18px] w-[18px] text-yellow-300" />
                  {recipe.duration}
                </div>
                <div className="relative z-10 h-8 flex flex-row justify-center items-center gap-1 px-6 py-2 glassmorphism text-black font-bold rounded-[3rem] text-xs">
                  <IconStar className="h-[18px] w-[18px] text-yellow-300" />
                  {recipe.level}
                </div>
                <div className="relative z-10 h-8 flex flex-row justify-center items-center gap-1 px-6 py-2 glassmorphism text-black font-bold rounded-[3rem] text-xs">
                  <IconFlame className="h-[20px] w-[20px] text-yellow-300" />
                  {recipe.calories}&nbsp;kcal
                </div>
              </div>
            </div>
          </div>
        </FollowerPointerCard>
      </Link>
    </div>
  );
}

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex space-x-2 items-center">
    <Image
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    />
    <p>{title}</p>
  </div>
);

export default FoodCard;
