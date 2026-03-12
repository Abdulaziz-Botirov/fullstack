import api from "../api";
import React, { useState, useEffect, useContext } from "react";
import { Heart, ShoppingBag, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import HeroSlider from "../components/HeroSlider";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [liked, setLiked] = useState({});
  const { user } = useContext(AuthContext);


  const [openCommentsFor, setOpenCommentsFor] = useState(null); 
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    fetchProducts();
    if (user) fetchMyLikes();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/api/products");
      setProducts(data);
    } catch (e) {
      console.error("API error:", e);
    }
  };

  const fetchMyLikes = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get("/api/likes/getMyLikes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      const map = {};
      data.forEach((l) => {
        map[l.productId] = true;
      });
      setLiked(map);
    } catch (e) {
      console.log("fetchMyLikes:", e?.response?.data || e.message);
    }
  };

  const toggleLike = async (productId) => {
    if (!user) return alert("Oldin tizimga kiring!");

    setLiked((prev) => ({ ...prev, [productId]: !prev[productId] }));

    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/api/likes/toggleLike",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
     
      );
    } catch (e) {
      setLiked((prev) => ({ ...prev, [productId]: !prev[productId] }));
      alert(e?.response?.data?.message || e.message);
    }
  };

  const handleAddToCart = async (id) => {
    if (!user) return alert("Oldin tizimga kiring!");

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/api/cart",
        { productId: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
     
    } catch (e) {
      console.log("URL:", e?.config?.baseURL + e?.config?.url);
      console.log("STATUS:", e?.response?.status);
      console.log("DATA:", e?.response?.data);
      console.log("MSG:", e.message);
      alert(e?.response?.data?.message || e.message);
    }
  };

 
  const openComments = async (productId) => {
    setOpenCommentsFor(productId);
    setComments([]);
    setCommentText("");
    setLoadingComments(true);

    try {
      const { data } = await api.get(`/api/products/${productId}/comments`);
      setComments(Array.isArray(data) ? data : (data.comments || []));
    } catch (e) {
      console.log("GET comments error:", e?.response?.data || e.message);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const closeComments = () => {
    setOpenCommentsFor(null);
    setComments([]);
    setCommentText("");
  };

  const submitComment = async () => {
    if (!user) return alert("Komment yozish uchun login qiling!");
    if (!commentText.trim()) return alert("Komment bo'sh bo'lmasin!");

    try {
      const token = localStorage.getItem("token");
      const productId = openCommentsFor;

      const { data } = await api.post(
        `/api/products/${productId}/comments`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments((prev) => [data, ...prev]);
      setCommentText("");
    } catch (e) {
      console.log("POST comment error:", e?.response?.data || e.message);
      alert(e?.response?.data?.message || e.message);
    }
  };

  const currentProduct = products.find((p) => p.id === openCommentsFor);

  return (

    
    <div>
      <div>
  <HeroSlider />

  <h2 className="text-2xl font-bold mb-8">Mahsulotlar</h2>

  {/* qolgan kod */}
</div>
      <h2 className="text-2xl font-bold mb-8">Mahsulotlar</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 && (
          <p className="text-gray-400">Hozircha mahsulotlar yo'q...</p>
        )}

        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 border rounded-3xl hover:shadow-xl transition-shadow group"
          >
            <div className="h-48 bg-gray-100 mb-4 rounded-2xl flex items-center justify-center relative">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <span className="text-gray-300">Rasm yo'q</span>
              )}

              <button
                onClick={() => toggleLike(p.id)}
                className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:scale-110 transition-transform"
                title="Like"
              >
                <Heart
                  size={20}
                  className={
                    liked[p.id] ? "text-red-500 fill-red-500" : "text-gray-400"
                  }
                />
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

            {/* COMMENTS BUTTON */}
            <button
              onClick={() => openComments(p.id)}
              className="mt-4 w-full text-left text-sm font-bold text-gray-700 hover:text-[#ec1839]"
            >
              Comments →
            </button>
          </div>
        ))}
      </div>

      {/* COMMENTS MODAL */}
      {openCommentsFor && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-xl bg-white rounded-3xl border shadow-xl">
            <div className="p-6 flex items-start justify-between border-b">
              <div>
                <h3 className="text-xl font-black">Comments</h3>
                <p className="text-gray-400 text-sm">
                  {currentProduct?.title || "Mahsulot"}
                </p>
              </div>
              <button
                onClick={closeComments}
                className="p-2 rounded-xl hover:bg-gray-100"
              >
                <X />
              </button>
            </div>

            <div className="p-6">
              <div className="flex gap-3">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Komment yozing..."
                  className="flex-1 border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#ec1839] outline-none px-4 py-3 rounded-2xl"
                />
                <button
                  onClick={submitComment}
                  className="bg-[#ec1839] text-white px-6 py-3 rounded-2xl font-black"
                >
                  Yuborish
                </button>
              </div>

              <div className="mt-6 space-y-3 max-h-[360px] overflow-auto pr-1">
                {loadingComments ? (
                  <p className="text-gray-400">Yuklanmoqda...</p>
                ) : comments.length === 0 ? (
                  <p className="text-gray-400">Hozircha comment yo‘q.</p>
                ) : (
                  comments.map((c) => (
                    <div
                      key={c.id || c.createdAt}
                      className="p-4 border rounded-2xl"
                    >
                      <p className="text-sm text-gray-800">
                        {c.text || c.comment}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {c.User?.email || c.user?.email || "User"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-6 border-t flex justify-end">
              <button
                onClick={closeComments}
                className="px-6 py-3 rounded-2xl border font-bold hover:bg-gray-50"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;