import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', form);
            login(data);
        } catch (err) { alert('Login yoki parol xato!'); }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-10 rounded-[40px] border shadow-sm">
            <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tighter">Kirish</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <input type="email" placeholder="Email manzilingiz" className="w-full border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#ec1839] outline-none px-5 py-4 rounded-2xl transition-all" onChange={e => setForm({...form, email: e.target.value})} required />
                <input type="password" placeholder="Parolingiz" className="w-full border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#ec1839] outline-none px-5 py-4 rounded-2xl transition-all" onChange={e => setForm({...form, password: e.target.value})} required />
                <button className="w-full bg-[#ec1839] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-[#ec1839]/30 transition-all">KIRISH</button>
            </form>
            <p className="text-center mt-6 text-gray-400">Akkountingiz yo'qmi? <Link to="/register" className="text-[#ec1839] font-bold">Ro'yxatdan o'tish</Link></p>
        </div>
    );
};
export default Login;