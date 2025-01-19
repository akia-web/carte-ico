'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { ToastContext } from '@/app/provider/toast.provider';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';


export default function SubscribeForm() {
  const { show } = useContext(ToastContext);
  const router: AppRouterInstance = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  useEffect(() => {
    setBaseUrl(window.location.origin);
    const token: string | null = localStorage.getItem('ico');
    if (token) {
      show('Erreur', `Vous n'êtes pas connecté`, 'error');
      router.push('/profile');
    }
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      show('Erreur', 'Les mots de passes ne correspondent pas', 'error');
      return;
    }

    await fetch(`${baseUrl}/api/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res: Response) => {
      {
        if (res.status === 201) {
          show('Inscription réussite', 'Vous pouvez maintenant vous connecter', 'success');
          router.push('/login');
        }
      }
    });
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


      {/* Title */}
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">
        S'inscrire
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <User size={20}/>
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom"
            className="w-full px-10 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
            required
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Mail size={20}/>
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
            <Lock size={20}/>
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
            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Lock size={20}/>
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmer le mot de passe"
            className="w-full px-10 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#C69C6D] text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-[#B58C5D] transition-colors"
        >
          S'inscrire
        </button>

        {/* Login Link */}
        <div className="text-center text-white mt-6">
          <span>Déjà un compte? </span>
          <a href="/login" className="text-[#C69C6D] hover:underline">
            Se connecter
          </a>
        </div>
      </form>
    </div>
  );
}