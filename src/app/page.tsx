"use client"

import { useRouter } from "next/navigation"
import { Button } from 'primereact/button';
import Image from 'next/image'

export default function Home() {
  const router = useRouter();

  const goGame = () => {
    router.push(`/game`);
  };

  return (
    <div className='full-height flex items-center'>
      <div className='w-[85%] flex flex-col m-auto items-center'>
      <h1 className='text-white font text-4xl mb-[80px]'>Bienvenue a bord !</h1>
      <p className='text-white'>Avant de commencer</p>
      <button onClick={()=>goGame()} 
      className='bg-white p-1.5 flex justify-center items-center w-[200px] mt-4 rounded-lg'>
        <span className='mr-2.5'>Acheter le jeu</span>
        <Image src="/Illustrations/coin.svg" 
                              height={25} 
                              width={25} 
                              alt="image pièce"/>
      </button>
      <br />
      <Button onClick={()=>goGame()} label='Se connecter' 
      className='bg-goldenColor text-white p-1.5  w-[200px]'></Button>
      <div>
      </div>
      </div>
    
    </div>
  );
}