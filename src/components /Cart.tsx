import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/setupSupabase';

interface Product {
  name: string;
  price: number;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  products: Product;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          products (
            name,
            price
          )
        `)
        .eq('user_id', user.id);
  
      if (error) {
        console.error('Error fetching cart items:', error);
      } else {
        setCartItems(data || []);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Warenkorb</h2>
      {cartItems.length === 0 ? (
        <p>Ihr Warenkorb ist leer.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-semibold">{item.products.name}</p>
                <p>Menge: {item.quantity}</p>
              </div>
              <p>€{(item.quantity * item.products.price).toFixed(2)}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Cart;
