import { useEffect, useState } from "react";
import { supabase } from '../utils/setupSupabase';
import { fetchFavoriteRecipes, Recipe, removeFavoriteRecipe } from '../services/recipeService'; 
import { User } from "@supabase/supabase-js";
import { FaTrash } from "react-icons/fa";  

const Profile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user }} = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            const loadFavorites = async () => {
                const favorites = await fetchFavoriteRecipes(user.id);
                setFavoriteRecipes(favorites);
            };
            loadFavorites();
        }
    }, [user]);

    const removeFavorite = async (recipeId: string) => {
        if (!user) return;
        
        try {
            await removeFavoriteRecipe(user.id, recipeId); 
            setFavoriteRecipes(favoriteRecipes.filter(recipe => recipe.id !== recipeId)); 
        } catch (error) {
            console.error("Fehler beim Entfernen des Favoriten", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-inter font-semibold mb-2">Meine Favoriten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteRecipes.map((recipe) => (
                    <div key={recipe.id} className="border p-4 rounded-lg relative">
                        <img src={recipe.image_url} alt={recipe.name} className="w-full h-48 object-cover mb-2 rounded" />
                        <h3 className="font-bold">{recipe.name}</h3>
                        <p className="text-sm">{recipe.description}</p>
                        <button 
                            onClick={() => removeFavorite(recipe.id)} 
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-200"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
