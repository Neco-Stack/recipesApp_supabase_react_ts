import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/setupSupabase';
import { FaShoppingCart } from 'react-icons/fa';
import { Product } from '../../types/supabaseGenTypes';

interface ProductListProps {
  handleAddToCart: (productId: string) => Promise<void>;
}

const ProductList: React.FC<ProductListProps> = ({ handleAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Fehler beim Laden der Produkte:', error.message);
    } else {
      setProducts(data || []);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-3xl font-bold mb-8">Unsere Produkte</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={product.image_url || 'default-image.jpg'} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
            <p className="text-xl font-bold text-gray-900 mt-2">€{product.price.toFixed(2)}</p>
            <button
              className="mt-4 w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center justify-center"
              onClick={() => handleAddToCart(product.id)}
            >
              <FaShoppingCart className="mr-2" />
              In den Warenkorb
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
