import { useEffect, useState } from "react";
import { supabase } from '../utils/setupSupabase';
import { fetchFavoriteRecipes, Recipe } from '../services/recipeService';
import { User } from "@supabase/supabase-js";

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
                setFavoriteRecipes(favorites)
            };
            loadFavorites();
        }
    }, [user]);



    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Mein Profil</h1>
            <h2 className="text-xl font-semibold mb-2">Meine Favoriten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteRecipes.map((recipe) => (
                    <div key={recipe.id} className="border p-4 rounded-lg">
                        <img src={recipe.image_url} alt={recipe.name} className="w-full h-48 object-cover mb-2 rounded" />
                        <h3 className="font-bold">{recipe.name}</h3>
                        <p className="text-sm">{recipe.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;