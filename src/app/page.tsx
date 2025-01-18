'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import Image from 'next/image';
import { useUser } from '@/app/provider/userProvider';
import { useEffect, useState } from 'react';
import { UserDto } from '@/app/interfaces/user.dto';

export default function Home() {
  const router = useRouter();
  const { user, isConnected, setConnectedUser } = useUser();
  const goTo = (url: string) => {
    router.push(`/${url}`);
  };
  const [baseUrl, setBaseUrl] = useState<string>('');


  useEffect((): void => {
    setBaseUrl(window.location.origin);
    const token: string | null = localStorage.getItem('ico');
    if ((!user || !isConnected) && token) {
      getUser(token);
    }
  }, []);

  const getUser = async (token: string): Promise<void> => {
    const response = await fetch(`${baseUrl}/api/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data: null | UserDto = await response.json();
    setConnectedUser(data);
  };

  return (
    <div className="full-height flex items-center">
      <div className="w-[85%] flex flex-col m-auto items-center">
        <h1 className="text-white font text-4xl mb-[80px]">Bienvenue a bord !</h1>
        <p className="text-white">Avant de commencer</p>
        <button
                className="bg-white p-1.5 flex justify-center items-center w-[200px] mt-4 rounded-lg">
          <span className="mr-2.5">Acheter le jeu</span>
          <Image src="/Illustrations/coin.svg"
                 height={25}
                 width={25}
                 alt="image pièce"/>
        </button>
        <br/>
        {isConnected && user ? (
          <Button onClick={() => goTo('game')} label="Jouer"
                  className="bg-goldenColor text-white p-1.5  w-[200px]"></Button>
        ) : (
          <Button onClick={() => goTo('login')} label="Se connecter"
                  className="bg-goldenColor text-white p-1.5  w-[200px]"></Button>
        )}

        <div>
        </div>
      </div>

    </div>
  );
}