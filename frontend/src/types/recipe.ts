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
