import { useForm, useFieldArray } from "react-hook-form";
import { RecipeFormData } from "@/types/recipe";
import { recipeFormResolver } from "@/utils/form-resolver";

interface RecipeFormProps {
  onSubmit: (data: RecipeFormData) => void;
}

const RecipeForm = ({ onSubmit }: RecipeFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: recipeFormResolver,
    defaultValues: {
      title: "",
      author: "",
      description: "",
      level: "Easy",
      duration: "",
      calories: 0,
      image: "",
      steps: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" bg-white/30 p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto backdrop-blur-xl border border-gray-200"
    >
      <label className="text-3xl font-bold mb-8 flex justify-center items-center bg-gradient-to-r from-indigo-700 to-purple-500 bg-clip-text text-transparent">
        Add Your Exquisite Recipe
      </label>

      {/* First Row: Title and Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-lg font-medium text-gray-900">
            Recipe Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="w-full p-3 mt-1 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter the recipe title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-900">
            Author
          </label>
          <input
            type="text"
            {...register("author")}
            className="w-full p-3 mt-1 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter the author's name"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-2">{errors.author.message}</p>
          )}
        </div>
      </div>

      {/* Second Row: Description */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-gray-900">
          Description
        </label>
        <textarea
          {...register("description")}
          className="w-full p-3 mt-1 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe the recipe"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-2">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Third Row: Difficulty, Duration, and Calories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-lg font-medium text-gray-900">
            Difficulty Level
          </label>
          <select
            {...register("level")}
            className="w-full p-3 mt-1 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-900">
            Duration
          </label>
          <input
            type="text"
            {...register("duration")}
            className="w-full p-3 mt-1 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter duration (e.g., 30 mins)"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-2">
              {errors.duration.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-900">
            Calories
          </label>
          <input
            type="number"
            {...register("calories", { valueAsNumber: true })}
            className="w-full p-3 mt-1 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter calories (e.g., 450)"
          />
          {errors.calories && (
            <p className="text-red-500 text-sm mt-2">
              {errors.calories.message}
            </p>
          )}
        </div>
      </div>

      {/* Fourth Row: Image */}
      <div className="w-full gap-6 mb-8">
        <div>
          <label className="block text-lg font-medium text-gray-900">
            Image URL
          </label>
          <input
            type="url"
            {...register("image")}
            className="w-full p-3 mt-1 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter image URL"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-2">{errors.image.message}</p>
          )}
        </div>
      </div>

      {/* Fifth Row: Steps */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-gray-900">Steps</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center mb-3 mt-1">
            <input
              type="text"
              {...register(`steps.${index}` as const)}
              className="w-full p-3 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={`Step ${index + 1}`}
            />
            <button
              type="button"
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </div>
        ))}
        {errors.steps && (
          <p className="text-red-500 text-sm mt-2">{errors.steps.message}</p>
        )}
        <button
          type="button"
          onClick={() => append("")}
          className="mt-3 text-white hover:underline focus:outline-none bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-lg"
        >
          + Add Another Step
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300"
      >
        Add Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
