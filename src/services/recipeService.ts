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