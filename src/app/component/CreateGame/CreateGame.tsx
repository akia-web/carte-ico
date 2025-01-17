import { useGame } from "@/app/provider/game";
import { Button } from "primereact/button";
import { useState } from "react";
import Image from 'next/image'
import { Slider } from "primereact/slider";
export default function CreateGame() {

    const {initGame} = useGame();
    const [nbPlayer, setNumberPlayers] = useState<number>(7);
    const [nbPartyGagnante, setNbPartyGagnante] = useState<number>(10);
    const [timeToSee, setTimeToSee] = useState<number>(30);

    const validate = (e: React.FormEvent)=>{
        e.preventDefault();
        initGame(nbPlayer, nbPartyGagnante, timeToSee)
      }
    return (
      <div className='full-height flex items-center'>
        <div className='w-[85%] flex flex-col m-auto items-center'>
            <h1 className="text-white font text-4xl mb-[40px]">Créer une partie</h1>
          
          <form onSubmit={validate} className="flex flex-col justify-center items-center">
              <div className="p-8 flex flex-col  bg-white rounded-lg">
                <div className="flex flex-col mt-2.5">
                  <div className="flex items-center mb-4">
                    <Image src="/Illustrations/skull.svg" 
                      width={30} 
                      height={30} 
                      className="mr-2.5"
                      alt="icone squelette"/>
                    <label htmlFor="numberPlayer"
                          className="text-sm">
                          Nombre de joueurs: {nbPlayer}
                    </label>
                   </div>
                    <Slider value={nbPlayer} 
                          className="w-[162px] ml-[40px]"
                          min={7}
                          max={20}
                          onChange={(e) => 
                          setNumberPlayers(Number(e.value))} />
                 
                </div>
      
                <div className="flex flex-col mt-8">
                  <div className="flex items-center mb-4">
                    <Image src="/Illustrations/sword.svg" 
                      width={30} 
                      height={30} 
                      className="mr-2.5"
                      alt="icone épée"/>
                    <label htmlFor="numberWinParty"
                          className="text-sm">
                      Manches gagnantes: {nbPartyGagnante}
                    </label>
                  </div>
                   
                  <Slider value={nbPartyGagnante} 
                        className="w-[162px] ml-[40px]"
                        min={2}
                        max={10}
                        onChange={(e) => 
                          setNbPartyGagnante(Number(e.value))} />
                </div>

                <div className="flex flex-col mt-8">
                  <div className="flex items-center mb-4">
                  <Image src="/Illustrations/bomb.svg" 
                    width={30} 
                    height={30} 
                    className="mr-2.5"
                    alt="icone bombe"/>
                  <label htmlFor="time"
                        className="text-sm">
                    Révélation des pirates: {timeToSee} sec
                  </label>
                  </div>              

                  <Slider value={timeToSee} 
                        className="w-[162px] ml-[40px]"
                        min={10}
                        max={30}
                        onChange={(e) => 
                          setTimeToSee(Number(e.value))} />
                </div>
              </div>
              <Button type="submit" 
              label="Partir en expédition"
              className="bg-goldenColor text-white p-1.5  w-[200px] mt-8"></Button>
             
          </form>
        </div>
        </div>
      );
}