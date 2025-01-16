import { useGame } from "@/app/provider/game";
import { Button } from "primereact/button";
import { useState } from "react";
import Image from 'next/image'
import { Slider } from "primereact/slider";
export default function CreateGame() {

    const {players, initGame} = useGame();
    const [nbPlayer, setNumberPlayers] = useState<number>(7);
    const [nbPartyGagnante, setNbPartyGagnante] = useState<number>(10);
    const [timeToSee, setTimeToSee] = useState<number>(30);

    const validate = (e: React.FormEvent)=>{
        e.preventDefault();
        initGame(nbPlayer, nbPartyGagnante, timeToSee)
      }
    return (
        <div style={{ background: ''}} className="w-[80%] m-auto flex justify-center min-h-[80vh]">
          <form onSubmit={validate} className="flex flex-col justify-center">
            <div className="shadow">
              <div className="bg-primaryDarkColor text-white h-14 flex justify-center items-center">
                <h1 className="text-center">Creer une partie</h1>
              </div>
              <div className="px-8 flex flex-col">
                <div className="flex flex-col mt-2.5">
                  <label htmlFor="numberPlayer">Nombre de joueurs: {nbPlayer}</label>
                  <div className="flex items-center">
                    <Image src="/icons/personnes.svg" 
                    width={30} 
                    height={30} 
                    className="mr-2.5"
                    alt="icone nombre de joueurs"/>
                  
                    <Slider value={nbPlayer} 
                          className="w-full"
                          min={7}
                          max={20}
                          onChange={(e) => 
                          setNumberPlayers(Number(e.value))} />
                  </div>
                </div>
      
                <div className="mt-4 flex flex-col">
                  <label htmlFor="numberWinParty">Manches gagnantes: {nbPartyGagnante}</label>
                  <div className="flex items-center">
                    <Image src="/icons/manches.svg" 
                    width={30} 
                    height={30} 
                    className="mr-2.5"
                    alt="icone nombre de joueurs"/>
                  
                    <Slider value={nbPartyGagnante} 
                          className="w-full"
                          min={2}
                          max={10}
                          onChange={(e) => 
                            setNbPartyGagnante(Number(e.value))} />
                  </div>
                </div>

                <div className="mt-4 flex flex-col">
                  <label htmlFor="time">Révélation des pirates: {timeToSee} sec</label>
                  <div className="flex items-center">
                    <Image src="/icons/time.svg" 
                    width={30} 
                    height={30} 
                    className="mr-2.5"
                    alt="icone nombre de joueurs"/>
                  
                    <Slider value={timeToSee} 
                          className="w-full"
                          min={10}
                          max={30}
                          onChange={(e) => 
                            setTimeToSee(Number(e.value))} />
                  </div>
                </div>
                <Button type="submit" 
                label="Jouer !"
                className="border border-secondaryActionColor text-secondaryActionColor p-2.5  mt-8 self-center mb-4"></Button>
              </div>
            </div>
          </form>
        </div>
      );
}