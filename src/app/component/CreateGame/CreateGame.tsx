import { useGame } from "@/app/provider/game";
import { Button } from "primereact/button";
import { useState } from "react";

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
            <div className="flex flex-col">
              <label htmlFor="numberPlayer">Nombre de joueurs</label>
              <input type="number" 
                     id="numberPlayer"
                     min={7}
                     max={20}
                     value={nbPlayer}
                     className="border p-1.5 rounded"
                     onChange={(e) => setNumberPlayers(Number(e.target.value)) }/>
            </div>
    
            <div className="mt-4 flex flex-col">
              <label htmlFor="numberWinParty">Nombre de parties gagnantes</label>
              <input type="number" 
                     min={2}
                     value={nbPartyGagnante}
                     id="numberWinParty" 
                     className="border p-1.5 rounded"
                     onChange={(e) => setNbPartyGagnante(Number(e.target.value)) }/>
            </div>

            <div className="mt-4 flex flex-col">
              <label htmlFor="time">Temps pour se regarder</label>
              <input type="number" 
                     id="time"
                     min={1}
                     value={timeToSee}
                     className="border p-1.5 rounded" 
                     onChange={(e) => setTimeToSee(Number(e.target.value)) }/>
            </div>
            <Button type="submit" 
            className="bg-violet-900 text-white p-2.5 rounded-full mt-8 self-center">Valider</Button>
          </form>
        </div>
      );
}