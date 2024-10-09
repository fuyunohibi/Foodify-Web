import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema } from "@/schemas/recipe-schema";

export const recipeFormResolver = zodResolver(recipeSchema);
