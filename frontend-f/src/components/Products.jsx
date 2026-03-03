import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Heart, ShoppingCart } from 'lucide-react';

const Products = () => {
  const { products, loading, error } = useProducts();
  const { addToCart, toggleLike, isLiked } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="text-center py-12">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Xatolik: {error}</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Mahsulotlar</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">Barchasi</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-indigo-600 font-bold mb-2">{product.category}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">${product.price}</span>
              <div className="flex gap-2">
                <button onClick={() => toggleLike(product)}>
                  <Heart className={`w-6 h-6 ${isLiked(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
                <button onClick={() => addToCart(product)} className="bg-indigo-600 text-white p-2 rounded-lg">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;