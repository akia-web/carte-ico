"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import Image from 'next/image'

export default function Game() {
      const router = useRouter();
    const handleCreateGame = () => {
        const newGameId = Math.random().toString(36).substr(2, 9);
        router.push(`/game/${newGameId}`);
      };

    return(
      <div className='full-height flex items-center'>
          <div className='w-[85%] flex flex-col m-auto items-center'>
            <h1 className="text-white font text-3xl mb-[50px]">Bienvenue Moussaillon</h1>

            <Image src="/Illustrations/boussole.svg" 
                  height={170} 
                  width={170}
                  className="mb-[50px]" 
                  alt="image pièce"/>

            <Button label="Commencer la partie" 
                    onClick={()=>{handleCreateGame()}}
                    className="bg-goldenColor text-white p-1.5  w-[200px]"></Button>
          </div>   
      </div>
    )
}