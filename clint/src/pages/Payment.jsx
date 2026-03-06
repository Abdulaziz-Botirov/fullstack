import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Payment = () => {

  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlePay = async () => {

    if (cardNumber.length < 16) {
      return alert("Karta raqamini to'g'ri kiriting");
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      await api.post(
        "/api/checkout",
        { cardNumber },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("To'lov muvaffaqiyatli!");

      navigate("/");

    } catch (e) {

      console.log(e);
      alert("To'lovda xatolik");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-10 rounded-3xl shadow-lg">

      <h2 className="text-3xl font-black mb-8 text-center">
        To'lov
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Karta raqami"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full border p-4 rounded-xl"
        />

        <input
          type="text"
          placeholder="Ism Familya"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-4 rounded-xl"
        />

        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-full border p-4 rounded-xl"
        />

        <button
          onClick={handlePay}
          className="w-full bg-[#ec1839] text-white py-4 rounded-xl font-bold hover:bg-red-600"
        >
          {loading ? "To'lanmoqda..." : "To'lash"}
        </button>

      </div>

    </div>
  );
};

export default Payment;