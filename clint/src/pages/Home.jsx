import React, { useState, useEffect, useContext } from 'react';
import api from '../api';
import { Heart, ShoppingBag } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
        } catch(e) { console.error("API error:", e); }
    };

    const handleAddToCart = async (id) => {
        if (!user) return alert('Oldin tizimga kiring!');
        try {
            await api.post('/cart', { productId: id, quantity: 1 });
            alert('Savatga qo\'shildi!');
        } catch(e) { alert('Savatga qo\'shishda xatolik!'); }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-8">Mahsulotlar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length === 0 && <p className="text-gray-400">Hozircha mahsulotlar yo'q...</p>}
                {products.map(p => (
                    <div key={p.id} className="bg-white p-4 border rounded-3xl hover:shadow-xl transition-shadow group">
                        <div className="h-48 bg-gray-100 mb-4 rounded-2xl flex items-center justify-center relative">
                            {p.image ? <img src={p.image} className="w-full h-full object-cover rounded-2xl"/> : <span className="text-gray-300">Rasm yo'q</span>}
                            <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full text-pink-500 hover:scale-110 transition-transform">
                                <Heart size={20}/>
                            </button>
                        </div>
                        <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{p.category || 'Kategoriya'}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-black text-[#ec1839]">${p.price}</span>
                            <button 
                                onClick={() => handleAddToCart(p.id)}
                                className="bg-black text-white p-3 rounded-2xl hover:bg-gray-800 transition-colors"
                            >
                                <ShoppingBag size={20}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Home;