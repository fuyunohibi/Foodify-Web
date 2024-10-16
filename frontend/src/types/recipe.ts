export interface RecipeFormData {
  title: string;
  author: string;
  description: string;
  level: "Easy" | "Medium" | "Hard";
  duration: string;
  calories: number;
  image: string;
  steps: string[];
}

export interface RecipeData {
  id: number;
  author: string;
  authorAvatar?: string;
  calories: number;
  date: string;
  description: string;
  duration: string;
  image: string;
  level: string;
  steps: string[];
  title: string;
}