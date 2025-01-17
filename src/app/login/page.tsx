"use client";
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; 
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  return (
    <div className="min-h-screen bg-[#0F4C81] flex flex-col items-center justify-center px-4 pb-36">
      {/* Logo Section */}

      {/* Title */}
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">
        Se connecter
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* Email Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Mail size={20} />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-10 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Lock size={20} />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            className="w-full px-10 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <a href="#" className="text-white text-sm hover:underline">
            Mot de passe oublié?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#C69C6D] text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-[#B58C5D] transition-colors"
        >
          Se connecter
        </button>

        {/* Register Link */}
        <div className="text-center text-white mt-6">
          <span>Pas encore de compte? </span>
          <a href="#" className="text-[#C69C6D] hover:underline">
            S'inscrire
          </a>
        </div>
      </form>
    </div>
  );
}