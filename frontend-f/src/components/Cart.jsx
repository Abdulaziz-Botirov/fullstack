import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Savat bo'sh</h2>
        <p className="text-gray-500">Mahsulotlar qo'shish uchun mahsulotlar sahifasiga o'ting.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Savat</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center p-4 border-b last:border-b-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="w-24 text-right font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <div className="p-4 bg-gray-50">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Jami:</span>
            <span className="text-indigo-600">${getCartTotal().toFixed(2)}</span>
          </div>
          
          <button className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200">
            Buyurtma berish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;