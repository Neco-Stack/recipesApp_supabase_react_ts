// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { supabase } from '../utils/setupSupabase';
// import { Recipe } from '../services/recipeService';

// interface Ingredient {
//   id: string;
//   name: string;
//   quantity: number;
//   unit: string;
//   additional_info: string;
// }

// const RecipeDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [ingredients, setIngredients] = useState<Ingredient[]>([]);

//   useEffect(() => {
//     const fetchRecipeDetails = async () => {
//       if (!id) return;

//       const { data: recipeData, error: recipeError } = await supabase
//         .from('recipes')
//         .select('*')
//         .eq('id', id)
//         .single();

//       if (recipeError) {
//         console.error('Error fetching recipe:', recipeError);
//         return;
//       }

//       setRecipe(recipeData);

//       const { data: ingredientsData, error: ingredientsError } = await supabase
//         .from('ingredients')
//         .select('*')
//         .eq('recipe_id', id);

//       if (ingredientsError) {
//         console.error('Error fetching ingredients:', ingredientsError);
//         return;
//       }

//       setIngredients(ingredientsData);
//     };

//     fetchRecipeDetails();
//   }, [id]);

//   if (!recipe) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="relative min-h-screen">
//       <div 
//         className="absolute inset-0 bg-cover bg-center z-0" 
//         style={{ backgroundImage: `url(${recipe.image_url})` }}
//       />

//       <div className="absolute inset-0 bg-black opacity-50 z-10" />
      
//       <div className="relative z-20 container mx-auto px-4 py-8 text-white">
//         <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
        
//         <div className="bg-white bg-opacity-80 text-black p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-semibold mb-2">Zutaten</h2>
//           <ul className="list-disc list-inside mb-4">
//             {ingredients.map((ingredient) => (
//               <li key={ingredient.id}>
//                 {ingredient.quantity} {ingredient.unit} {ingredient.name}
//                 {ingredient.additional_info && ` (${ingredient.additional_info})`}
//               </li>
//             ))}
//           </ul>

//           <h2 className="text-2xl font-semibold mb-2">Zubereitung</h2>
//           <p className="whitespace-pre-line">{recipe.instructions}</p>

//           <div className="mt-4">
//             <h2 className="text-2xl font-semibold mb-2">Weitere Informationen</h2>
//             <p>Portionen: {recipe.servings}</p>
//             <p>Kategorie: {recipe.category_id}</p>
//             <p>Erstellt am: {new Date(recipe.created_at).toLocaleDateString()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetails;
