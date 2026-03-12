import React, { useEffect, useState, useContext } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const Likes = () => {
  const { user } = useContext(AuthContext);
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLikedProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const { data } = await api.get("/api/likes/getMyLikes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const products = data.map((item) => item.Product).filter(Boolean);
      setLikedProducts(products);
    } catch (e) {
      console.log("Likes error:", e?.response?.data || e.message);
      setLikedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchLikedProducts();
    } else {
      setLoading(false);
    }
  }, [user]);

  const removeLike = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/api/likes/toggleLike",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLikedProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  const handleAddToCart = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/api/cart",
        { productId: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Savatga qo‘shildi");
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  if (!user) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-8">Like qilingan mahsulotlar</h2>
        <p className="text-gray-500">Bu bo‘limni ko‘rish uchun login qiling.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Like qilingan mahsulotlar</h2>

      {loading ? (
        <p className="text-gray-400">Yuklanmoqda...</p>
      ) : likedProducts.length === 0 ? (
        <p className="text-gray-400">Hozircha like qilingan mahsulot yo‘q.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {likedProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 border rounded-3xl hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gray-100 mb-4 rounded-2xl flex items-center justify-center relative">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <span className="text-gray-300">Rasm yo‘q</span>
                )}

                <button
                  onClick={() => removeLike(p.id)}
                  className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:scale-110 transition-transform"
                  title="Unlike"
                >
                  <Heart size={20} className="text-red-500 fill-red-500" />
                </button>
              </div>

              <h3 className="font-bold text-lg mb-1">{p.title}</h3>
              <p className="text-gray-400 text-sm mb-4">
                {p.category || "Kategoriya"}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-[#ec1839]">
                  ${p.price}
                </span>

                <button
                  onClick={() => handleAddToCart(p.id)}
                  className="bg-black text-white p-3 rounded-2xl hover:bg-gray-800 transition-colors"
                >
                  <ShoppingBag size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Likes;