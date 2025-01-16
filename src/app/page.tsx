"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation"
import { Button } from 'primereact/button';

export default function Home() {
  const [gameId, setGameId] = useState('');
  const router = useRouter();

  const handleJoinGame = () => {
    if (gameId) {
      router.push(`/game/${gameId}`);
    }
  };

  const handleCreateGame = () => {
    const newGameId = Math.random().toString(36).substr(2, 9);
    router.push(`/game/${newGameId}`);
  };

  return (
    <div>
      <h1>Bienvenue sur le jeu</h1>
      <Button onClick={handleCreateGame} label='Nouvelle partie' 
      className='font-manrope bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 text-lg font-bold rounded-full shadow-lg transition-all hover:scale-105 hover:shadow-xl'></Button>
      <div>
      </div>
    </div>
  );
}