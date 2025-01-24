import { supabase } from "../utils/setupSupabase";
import { Database } from "../../types/supabaseGenTypes";

export type Recipe = Database['public']['Tables']['recipes']['Row'];

export const fetchPopularRecipes = async (): Promise<Recipe[]> => {
  const { data, error } = await supabase
    .from('recipes')
    .select('id, name, description, image_url, category_id, created_at, instructions, servings')
    .in('name', ['Waffeln', 'Pancakes', 'Heisse Schokolade'])

  if (error) {
    console.error('Fehler beim Abrufen der Rezepte:', error);
    return [];
  }
  
  return data || [];
};

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  const { data, error } = await supabase
    .from('recipes')
    .select('id, name, description, image_url, category_id, created_at, instructions, servings')
    .neq('name', 'Waffeln') 
    .neq('name', 'Pancakes')
    .neq('name', 'Heisse Schokolade');

  if (error) {
    console.error('Fehler  beim Abrufen der Rezepte:', error);
    return [];
  }
  
  return data || [];
};

export const addFavoriteRecipe = async (userId: string, recipeId: string) => {
  const { data, error } = await supabase
  .from('recipe_favorites')
  .insert([{ user_id: userId, recipe_id: recipeId}]);

  if (error) throw error;
  return data;
}

export const removeFavoriteRecipe = async (userId: string, recipeId: string) => {
  const { data, error } = await supabase
    .from('recipe_favorites')
    .delete()
    .match({ user_id: userId, recipe_id: recipeId });

    if (error) throw error;
    return data;
};


export const fetchFavoriteRecipes = async (userId: string): Promise<Recipe[]> => {
  const { data, error } = await supabase
    .from('recipe_favorites')
    .select('recipe_id')
    .eq('user_id', userId);

  if (error) throw error;

  const favoriteRecipeIds = data?.map(favorite => favorite.recipe_id);

  if (favoriteRecipeIds && favoriteRecipeIds.length > 0) {
    const { data: recipes, error: recipeError } = await supabase
    .from('recipes')
    .select('id, name, description, image_url, category_id, created_at, instructions, servings')
    .in('id', favoriteRecipeIds)

    if (recipeError) throw recipeError;
    return recipes || [];
  }
  return [];
};