import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { Heart, ShoppingCart } from "lucide-react";

const Products = () => {
  const { products } = useProducts();
  const { addToCart, toggleLike, isLiked } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Hozircha mahsulotlar yoq
        </h2>
        <p className="text-gray-500">Admin panel orqali mahsulot qoshing</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Mahsulotlar</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
          >
            <option value="">Barcha kategoriyalar</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.image || "https://via.placeholder.com/300x200"}
              alt={product.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <button
                  onClick={() => toggleLike(product)}
                  className="focus:outline-none"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isLiked(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <p className="text-gray-600 mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-sm text-indigo-600 mb-3">{product.category}</p>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-indigo-600">
                  <span className="text-2xl font-bold text-indigo-600">
                  {(() => {
  const priceNum = Number(product.price);
  return Number.isFinite(priceNum) ? `$${priceNum.toFixed(2)}` : "$0.00";
})()}
                  </span>
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Savatga</span>
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
