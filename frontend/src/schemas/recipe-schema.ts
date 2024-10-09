import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(1, "Description is required"),
  level: z.enum(["Easy", "Medium", "Hard"]),
  duration: z.string().min(1, "Duration is required"),
  calories: z
    .number({ invalid_type_error: "Calories must be a number" })
    .min(0, "Calories cannot be negative"),
  image: z.string().url("Invalid URL format"),
  steps: z
    .array(z.string().min(1, "Step cannot be empty"))
    .min(1, "At least one step is required"),
});
