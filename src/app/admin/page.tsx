"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation"

export default function Admin() {
  const [gameId, setGameId] = useState('');
  const router = useRouter();

  const handleJoinGame = () => {
    if (gameId) {
      router.push(`/game/${gameId}`);
    }
  };

  const handleCreateGame = () => {
    const newGameId = 'game-' + Math.random().toString(36).substr(2, 9);
    router.push(`/game/${newGameId}`);
  };

  return (
    <div>
      <h1>Parties</h1>
      <div className='flex flex-row-reverse'>
      <button onClick={handleCreateGame}>Créer un nouveau jeu</button>
      </div>
      
      <div>
        <h2>Liste des parties</h2>
      </div>
    </div>
  );
}