"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { ToastContext } from '@/app/provider/toast.provider';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/provider/user.provider';
import Link from 'next/link';

export default function LoginForm() {
  const {show} = useContext(ToastContext)
  const {setIsConnected, setConnectedUser} = useUser()
  const router: AppRouterInstance = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [baseUrl, setBaseUrl] = useState<string>('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    setBaseUrl(window.location.origin)
  }, []);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

      const response: Response = await fetch(`${baseUrl}/api/connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if(response.ok){
        const data = await response.json();
        localStorage.setItem('ico', data.token)
        setIsConnected(true)
        setConnectedUser(data.user)
        show('Connexion réussi', '', 'success')
        router.push('/profile')
      }else{
        show('Erreur', 'Erreur lors de la connexion', 'error')
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; 
    setFormData({
      ...formData,
      [name]: value, 
    });
  };

  return (
    <div className="min-h-screen bg-[#0F4C81] flex flex-col items-center justify-center px-4 pb-48">
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
          <Link href="/register" className="text-[#C69C6D] hover:underline">
            S'inscrire
          </Link>
        </div>
      </form>
    </div>
  );
}