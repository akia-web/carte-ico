import { useGame } from "@/app/provider/game";
import { useState } from "react";

export default function CreateGame() {

    const {players, initGame} = useGame();
    const [nbPlayer, setNumberPlayers] = useState<number>(0);
    const [nbPartyGagnante, setNbPartyGagnante] = useState<number>(0);
    const [timeToSee, setTimeToSee] = useState<number>(0);

    const validate = (e: React.FormEvent)=>{
        e.preventDefault();
        initGame(nbPlayer, nbPartyGagnante, timeToSee)
      }
    return (
        <div>
          <form onSubmit={validate}>
            <div>
              <label htmlFor="">Nombre de joueurs</label> <br />
              <input type="number" name="" id="" onChange={(e) => setNumberPlayers(Number(e.target.value)) }/>
            </div>
    
            <div>
              <label htmlFor="">Nombre de parties gagnantes</label> <br />
              <input type="number" name="" id="" onChange={(e) => setNbPartyGagnante(Number(e.target.value)) }/>
            </div>

            <div>
              <label htmlFor="">Temps pour se regarder (en seconde)</label> <br />
              <input type="number" name="" id="" onChange={(e) => setTimeToSee(Number(e.target.value)) }/>
            </div>
            <button type="submit">Valider</button>
          </form>
        </div>
      );
}