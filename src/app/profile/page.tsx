"use client"

import React, { useState } from 'react';
import Image from 'next/image'
import { Mail, Key, User, Trophy, Award, Settings, Edit } from 'lucide-react';

export default function ProfilePage() {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);


  const userData = {
    username: "Capitaine_Jacques",
    email: "jack@pirate.fr",
    stats: {
      gamesPlayed: 42,
      wins: 28,
      losses: 14,
      winRate: "66.7%"
    },
    badges: [
      { id: 1, name: "Première victoire", icon: "🏆", description: "Gagnez votre première partie" },
      { id: 2, name: "Navigateur émérite", icon: "⚓", description: "Gagnez 10 parties" },
      { id: 3, name: "Capitaine légendaire", icon: "👑", description: "Gagnez 20 parties" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0F4C81] text-white">
      {/* Profile Header */}
      <div className="bg-[#0A3860] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Image src={`/icons/carte-Pirates.svg`} 
                                       height={90} 
                                       width={90}
                                       className="mr-2.5 ml-2.5" 
                                       alt="Chapeau de pirate"/>
              <button className="absolute bottom-0 right-0 bg-[#C69C6D] p-2 rounded-full">
                <Edit size={16} />
              </button>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <User size={24} />
                {userData.username}
              </h1>
              <p className="text-gray-300 flex items-center gap-2">
                <Mail size={16} />
                {userData.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="bg-white/10 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy size={24} />
            Statistiques
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-300">Parties jouées</p>
              <p className="text-2xl font-bold">{userData.stats.gamesPlayed}</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-300">Parties gagnées</p>
              <p className="text-2xl font-bold text-green-400">{userData.stats.wins}</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-300">Parties perdues</p>
              <p className="text-2xl font-bold text-red-400">{userData.stats.losses}</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-300">Taux de victoire</p>
              <p className="text-2xl font-bold text-[#C69C6D]">{userData.stats.winRate}</p>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="bg-white/10 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Award size={24} />
            Succès
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userData.badges.map(badge => (
              <div key={badge.id} className="flex items-center p-4 bg-white/5 rounded-lg">
                <span className="text-3xl mr-4">{badge.icon}</span>
                <div>
                  <h3 className="font-bold">{badge.name}</h3>
                  <p className="text-sm text-gray-300">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white/10 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Settings size={24} />
            Options de compte
          </h2>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-300">Addresse mail</label>
              <button 
                onClick={() => setIsEditingEmail(!isEditingEmail)}
                className="text-[#C69C6D] text-sm hover:underline"
              >
                {isEditingEmail ? 'Cancel' : 'Change'}
              </button>
            </div>
            {isEditingEmail ? (
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="New Email Address"
                  className="w-full px-4 py-2 bg-white/5 rounded-lg border border-white/20 focus:outline-none focus:border-[#C69C6D]"
                />
                <button className="bg-[#C69C6D] text-white px-4 py-2 rounded-lg hover:bg-[#B58C5D] transition-colors">
                  Mettre à jour l'Email
                </button>
              </div>
            ) : (
              <p>{userData.email}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-300">Mot de passe</label>
              <button 
                onClick={() => setIsEditingPassword(!isEditingPassword)}
                className="text-[#C69C6D] text-sm hover:underline"
              >
                {isEditingPassword ? 'Cancel' : 'Change'}
              </button>
            </div>
            {isEditingPassword && (
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full px-4 py-2 bg-white/5 rounded-lg border border-white/20 focus:outline-none focus:border-[#C69C6D]"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-4 py-2 bg-white/5 rounded-lg border border-white/20 focus:outline-none focus:border-[#C69C6D]"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full px-4 py-2 bg-white/5 rounded-lg border border-white/20 focus:outline-none focus:border-[#C69C6D]"
                />
                <button className="bg-[#C69C6D] text-white px-4 py-2 rounded-lg hover:bg-[#B58C5D] transition-colors">
                  Mettre à jour le mot de passe
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
  
}