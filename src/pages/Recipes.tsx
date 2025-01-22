import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/setupSupabase"; 
import { fetchAllRecipes } from "../services/recipeService"; 
import { Recipe } from "../services/recipeService"; 
import Banner from "../components /BannerIntro";
import Hero from "../components /Hero";
import { User } from "@supabase/supabase-js";

const Recipes = () => {
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
    const [user, setUser] = useState<User | null>(null);  // 
    const [sessionChecked, setSessionChecked] = useState(false);  
    const navigate = useNavigate();

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.log("Error fetching session:", error.message);
                setUser(null);  
            } else {
                setUser(data?.session?.user || null);  
            }
            setSessionChecked(true); 
        };

        getSession();
    }, []);  

    useEffect(() => {
        if (sessionChecked && !user) {
            navigate("/login");  
        }
    }, [sessionChecked, user, navigate]);  

    useEffect(() => {
        if (user) {
            const loadRecipes = async () => {
                const all = await fetchAllRecipes();
                setAllRecipes(all);
            };

            loadRecipes();
        }
    }, [user]);  

    if (!sessionChecked) return null;  

    if (!user) return null; 

    return (
        <>
            <Banner />
            <Hero />
            <h2 className="text-center font-inter font-bold text-[#2c2b2b] text-[39px] mt-10 mb-8">Neueste Rezepte</h2>
            <div className="flex flex-col items-center space-y-4">
                {allRecipes.map((recipe) => (
                    <div key={recipe.id} className="flex justify-between bg-white shadow-lg rounded-[33px] w-full max-w-[1187px] h-[322px] overflow-hidden">
                        <img 
                            src={recipe.image_url} 
                            alt={recipe.name}
                            className="w-[403px] h-[322px] object-cover rounded-tl-[33px] rounded-bl-[33px]" />
                        <div className="flex flex-col justify-between p-4 w-[784px] h-full bg-[#f5f2f2] rounded-tr-[33px] rounded-br-[33px]">
                            <h3 className="font-inter font-bold text-[#2c2b2b] text-[40px] leading-tight mt-5">{recipe.name}</h3>
                            <p className="font-inter font-light text-[#2c2b2b] text-[20px]">{recipe.description}</p>
                            <button className="w-[188px] h-[43px] bg-[#ffdb63] text-[#2c2b2b] font-inter font-bold rounded-[32px] py-[9px] px-[33px]" style={{ padding: '9px 33px' }}>Zum Rezept
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Recipes;