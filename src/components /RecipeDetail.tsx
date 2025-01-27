import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipeById, Recipe } from "../services/recipeService";

type Ingredient = {
    name: string;
    quantity: number | null;
    unit: string | null;
    additional_info: string | null;
};

const RecipeDetail = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        const loadRecipeDetail = async () => {
            if (recipeId) {
                const fetchedRecipe = await fetchRecipeById(recipeId);
                setRecipe(fetchedRecipe);
            }
        };

        loadRecipeDetail();
    }, [recipeId]);

    if (!recipe) return <div>Loading...</div>;

    return (
        <div className="relative w-full min-h-screen bg-[#f5f2f2]">
            <img
                src={recipe.image_url}
                alt={recipe.name}
                className="w-full h-[400px] object-cover opacity-90"
            />
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                <h1 className="text-4xl font-bold font-inter">{recipe.name}</h1>
                <p className="text-xl font-inter mt-4">{recipe.description}</p>
            </div>
            <div className="relative mt-8 p-6 bg-white rounded-[33px] max-w-4xl mx-auto shadow-lg">
                <h2 className="text-2xl font-bold text-[#2c2b2b]">Zutaten:</h2>
                <ul className="list-disc pl-6 text-[#2c2b2b] font-inter font-light text-lg">
                    {recipe.ingredients?.map((ingredient: Ingredient, index: number) => (
                        <li key={index}>
                            {ingredient.name}
                            {ingredient.quantity && ` - ${ingredient.quantity} ${ingredient.unit ? ingredient.unit : ''}`}
                            {ingredient.additional_info && ` (${ingredient.additional_info})`}
                        </li>
                    ))}
                </ul>

                <h2 className="text-2xl font-bold text-[#2c2b2b] mt-6">Zubereitung:</h2>
                <p className="text-[#2c2b2b] font-inter font-light text-lg">{recipe.instructions}</p>
            </div>
        </div>
    );
};

export default RecipeDetail;
