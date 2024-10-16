import RecipeDetails from "@/components/recipes/view-recipe"; // Import the client component

interface IParams {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return [{id: "1"}]
}

const RecipePage = ({ params }: IParams) => {
  return <RecipeDetails id={params.id} />;
};

export default RecipePage;