import React, { useEffect, useState } from 'react';
import api from '../api';
import { Trash2 } from 'lucide-react';

const Cart = () => {
    const [cart, setCart] = useState([]);
    useEffect(() => { fetchCart(); }, []);

    const fetchCart = async () => {
        try {
            const res = await api.get('/cart');
            setCart(res.data);
        } catch(e) { console.error(e); }
    };

    const total = cart.reduce((acc, item) => acc + (item.Product?.price * item.quantity), 0);

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">Savat</h2>
            {cart.length === 0 ? <p className="text-gray-400">Savat bo'sh</p> : (
                <div className="space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="p-6 bg-white border rounded-[30px] flex justify-between items-center">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-gray-100 rounded-2xl"></div>
                                <div>
                                    <h4 className="font-bold text-lg">{item.Product?.title}</h4>
                                    <p className="text-gray-400">${item.Product?.price} x {item.quantity}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-xl font-bold">${item.Product?.price * item.quantity}</span>
                                <button className="text-red-400 hover:text-red-600"><Trash2/></button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-10 p-8 bg-black text-white rounded-[40px] flex justify-between items-center shadow-xl">
                        <div><p className="text-gray-400 uppercase text-xs font-bold mb-1">Jami summa</p><h3 className="text-4xl font-black">${total.toFixed(2)}</h3></div>
                        <button className="bg-[#ec1839] px-10 py-5 rounded-3xl font-black uppercase text-sm tracking-widest">To'lov</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Cart;