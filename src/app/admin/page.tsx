"use client"

import { useState } from 'react';
import { useRouter } from "next/navigation"

export default function Admin() {
  const [gameId, setGameId] = useState('');
  const router = useRouter();


  return (
    <div>
      Admin
    </div>
  );
}