import { useEffect, useState } from "react";
import { fetchPopularRecipes, Recipe } from '../services/recipeService';

const Hero = () => {
    const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const loadPopularRecipes = async () => {
            const recipes = await fetchPopularRecipes();
            setPopularRecipes(recipes)
        }

        loadPopularRecipes()
    }, [])

    return (
        <div className="hero py-10">
            <h2 className="text-center font-inter font-bold text-[38px] mb-8 text-customGray">Die beliebtesten Rezepte</h2>
            <div className="flex justify-center space-x-4">
                {popularRecipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card bg-white shadow-lg rounded-[30px] overflow-hidden w-[403px] h-[472px] flex flex-col">
                        <img 
                        src={recipe.image_url} 
                        alt={recipe.name}
                        className="w-full h-[212px] object-cover" />
                    <div className="p-4 bg-[#f5f2f2] flex-grow">
                    <h3 className="text-[32px] font-inter font-bold text-[#2c2b2b]">{recipe.name}</h3>
                    <p>{recipe.description}</p>
                    <button className="mt-4 w-[188px] h-[43px] bg-[#ffdb63] text-[#2c2b2b] font-inter font-bold rounded-[32px]">Zum Rezept</button>
                    </div>
                    </div>
                ))}
            </div>


        </div>
      );
}
 
export default Hero;