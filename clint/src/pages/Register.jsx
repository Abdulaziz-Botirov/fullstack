import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/auth/register', form);
            alert('Muvaffaqiyatli! Endi kiring.');
            navigate('/login');
        } catch(e) { alert('Xatolik!'); }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-10 rounded-[40px] border shadow-sm">
            <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tighter">Ro'yxatdan o'tish</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" placeholder="Ismingiz" className="w-full border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#ec1839] outline-none px-5 py-4 rounded-2xl transition-all" onChange={e => setForm({...form, name: e.target.value})} required />
                <input type="email" placeholder="Email manzilingiz" className="w-full border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#ec1839] outline-none px-5 py-4 rounded-2xl transition-all" onChange={e => setForm({...form, email: e.target.value})} required />
                <input type="password" placeholder="Parolingiz" className="w-full border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#ec1839] outline-none px-5 py-4 rounded-2xl transition-all" onChange={e => setForm({...form, password: e.target.value})} required />
                <button className="w-full bg-black text-white py-4 rounded-2xl font-black text-lg shadow-lg transition-all">RO'YXATDAN O'TISH</button>
            </form>
        </div>
    );
};
export default Register;