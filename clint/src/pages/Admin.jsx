import React, { useState } from 'react';
import api from '../api';

const Admin = () => {
    const [form, setForm] = useState({ title: '', price: '', category: '', description: '', image: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const token = localStorage.getItem("token");
      
          await api.post('/api/products', form, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          alert("Mahsulot qo'shildi!");
      
          setForm({
            title: '',
            price: '',
            category: '',
            description: '',
            image: ''
          });
      
        } catch (e) {
          console.log("STATUS:", e?.response?.status);
          console.log("DATA:", e?.response?.data);
          console.log("MESSAGE:", e.message);
      
          alert(e?.response?.data?.message || e.message);
        }
      };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tighter">Mahsulot Qo'shish</h2>
            <form onSubmit={handleSubmit} className="bg-white p-10 border rounded-[40px] space-y-5 shadow-sm">
                <input placeholder="Mahsulot nomi" className="w-full border-2 border-gray-100 bg-gray-50 focus:border-[#ec1839] outline-none px-5 py-4 rounded-2xl" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Narxi ($)" type="number" className="w-full border-2 border-gray-100 bg-gray-50 focus:border-[#ec1839] outline-none px-5 py-4 rounded-2xl" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
                    <input placeholder="Kategoriya" className="w-full border-2 border-gray-100 bg-gray-50 focus:border-[#ec1839] outline-none px-5 py-4 rounded-2xl" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
                </div>
                <input placeholder="Rasm URL" className="w-full border-2 border-gray-100 bg-gray-50 focus:border-[#ec1839] outline-none px-5 py-4 rounded-2xl" value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
                <textarea placeholder="Tavsif" className="w-full border-2 border-gray-100 bg-gray-50 focus:border-[#ec1839] outline-none px-5 py-4 rounded-2xl h-32" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                <button className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg shadow-lg">SAQLASH</button>
            </form>
        </div>
    );
};
export default Admin;