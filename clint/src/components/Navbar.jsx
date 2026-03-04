import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white shadow-sm border-b h-16 flex items-center sticky top-0 z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-[#ec1839]">STORE</Link>
                <div className="flex items-center gap-6">
                    <Link to="/cart" className="text-gray-600 hover:text-[#ec1839]"><ShoppingCart /></Link>
                    {user ? (
                        <div className="flex items-center gap-4">
                            {user.role === 'admin' && <Link to="/admin" className="text-gray-600 hover:text-[#ec1839]"><LayoutDashboard /></Link>}
                            <span className="font-semibold text-gray-700 flex items-center gap-1"><User size={18}/> {user.name}</span>
                            <button onClick={logout} className="text-red-500 hover:scale-110 transition-transform"><LogOut /></button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login" className="text-gray-600 font-medium">Kirish</Link>
                            <Link to="/register" className="bg-[#ec1839] text-white px-5 py-1.5 rounded-full text-sm font-bold">Ro'yxatdan o'tish</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
export default Navbar;