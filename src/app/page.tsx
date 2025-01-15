"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation"

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
      <button onClick={handleCreateGame}>Nouvelle partie</button>
      <div>
      </div>
    </div>
  );
}