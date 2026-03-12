import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Likes from "./pages/Like";
import { AuthContext } from "./context/AuthContext";
import Payment from "./pages/Payment";


function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/likes" element={<Likes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          {user?.role === "admin" && (<Route path="/admin" element={<Admin />} />)}
          <Route path="/payment" element={<Payment />} />
       
        </Routes>
      </main>
    </div>
  );
}

export default App;
