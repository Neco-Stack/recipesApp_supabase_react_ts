import React, { useState } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import { supabase } from '../utils/setupSupabase';

const Store: React.FC = () => {
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = async (productId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .rpc('add_to_cart', {
          p_user_id: user.id,
          p_product_id: productId,
        });

      if (error) {
        console.error("Fehler beim Hinzufügen zum Warenkorb:", error.message);
      } else {
        alert("Produkt wurde zum Warenkorb hinzugefügt!");
      }
    } else {
      alert("Bitte melden Sie sich an, um Produkte in den Warenkorb zu legen.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => setShowCart(!showCart)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {showCart ? 'Zurück zum Store' : 'Warenkorb anzeigen'}
      </button>
      {showCart ? (
        <Cart />
      ) : (
        <ProductList handleAddToCart={handleAddToCart} />
      )}
    </div>
  );
};

export default Store;
