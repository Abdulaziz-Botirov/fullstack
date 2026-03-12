import React, { useEffect, useMemo, useState } from "react";
import api from "../api";
import { Trash2, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("CART DATA:", res.data);
      setCart(res.data);
    } catch (e) {
      console.log("GET URL:", e?.config?.baseURL + e?.config?.url);
      console.log("GET STATUS:", e?.response?.status);
      console.log("GET DATA:", e?.response?.data);
      console.log("GET MSG:", e.message);
      alert(e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const getProduct = (item) => {
    return item?.Product || item?.product || {};
  };

  const total = useMemo(() => {
    return cart.reduce((acc, item) => {
      const p = getProduct(item);
      const price = Number(p.price || 0);
      const qty = Number(item.quantity || 0);
      return acc + price * qty;
    }, 0);
  }, [cart]);

  const removeItem = async (cartItemId) => {
    try {
      console.log("DELETE CART ITEM ID:", cartItemId);

      const res = await api.delete(`/api/cart/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("DELETE RES:", res.data);

      setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    } catch (e) {
      console.log("DELETE URL:", e?.config?.baseURL + e?.config?.url);
      console.log("DELETE STATUS:", e?.response?.status);
      console.log("DELETE DATA:", e?.response?.data);
      console.log("DELETE MSG:", e.message);
      alert(e?.response?.data?.message || e.message);
    }
  };

  const updateQuantity = async (cartItemId, newQty) => {
    if (newQty < 1) return;

    try {
      const res = await api.patch(
        `/api/cart/${cartItemId}`,
        { quantity: newQty },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("PATCH RES:", res.data);

      setCart((prev) =>
        prev.map((item) => (item.id === cartItemId ? res.data : item))
      );
    } catch (e) {
      console.log("PATCH URL:", e?.config?.baseURL + e?.config?.url);
      console.log("PATCH STATUS:", e?.response?.status);
      console.log("PATCH DATA:", e?.response?.data);
      console.log("PATCH MSG:", e.message);
      alert(e?.response?.data?.message || e.message);
    }
  };

  const goPayment = () => {
    if (!token) {
      alert("Oldin tizimga kiring!");
      return;
    }
    navigate("/payment");
  };

  if (!token) {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">
          Savat
        </h2>
        <p className="text-gray-400">Oldin tizimga kiring</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">
        Savat
      </h2>

      {loading ? (
        <p className="text-gray-400">Yuklanmoqda...</p>
      ) : cart.length === 0 ? (
        <p className="text-gray-400">Savat bo'sh</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => {
            const p = getProduct(item);
            const price = Number(p.price || 0);
            const qty = Number(item.quantity || 0);

            return (
              <div
                key={item.id}
                className="p-6 bg-white border rounded-[30px] flex justify-between items-center"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title || p.name || "Mahsulot"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-300 text-xs">Rasm yo'q</span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-lg">
                      {p.title || p.name || "Mahsulot"}
                    </h4>

                    <p className="text-gray-400">
                      ${price} x {qty}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      cartId: {item.id} | productId: {item.productId}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, qty - 1)}
                        className="p-2 rounded-xl border hover:bg-gray-50"
                        title="Kamaytirish"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="font-bold w-8 text-center">{qty}</span>

                      <button
                        onClick={() => updateQuantity(item.id, qty + 1)}
                        className="p-2 rounded-xl border hover:bg-gray-50"
                        title="Ko'paytirish"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-xl font-bold">
                    ${(price * qty).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600"
                    title="O'chirish"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="mt-10 p-8 bg-black text-white rounded-[40px] flex justify-between items-center shadow-xl">
            <div>
              <p className="text-gray-400 uppercase text-xs font-bold mb-1">
                Jami summa
              </p>
              <h3 className="text-4xl font-black">${total.toFixed(2)}</h3>
            </div>

            <button
              onClick={goPayment}
              className="bg-[#ec1839] px-10 py-5 rounded-3xl font-black uppercase text-sm tracking-widest"
            >
              To'lov
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;