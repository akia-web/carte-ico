import { ActionCarteEnum } from "@/app/enum/actionCarteEnum";
import { RoleEnum } from "@/app/enum/roleEnum";
import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/game";
import { useEffect, useState } from "react";

export default function FinalReveal() {
    const {scoreMarins, scorePirates, maxManchesGagnantes, players} = useGame();
    const [gagnant, setGagnant] = useState<RoleEnum>(scoreMarins === maxManchesGagnantes ? RoleEnum.MARINS : RoleEnum.PIRATES)
    const [selectedSirene, setSelectedSiren] = useState<Player | undefined>(undefined)
    const [pirateHaveFindSiren, setPirateHaveFindSiren] = useState<boolean | undefined>(undefined)

    const validate = () =>{
        const realSiren = players.find((element)=> element.role === RoleEnum.SIRENE)
        if(realSiren){
            if(selectedSirene === realSiren){
                setPirateHaveFindSiren(true)
            }else{
                setPirateHaveFindSiren(false);
            }
        }
    }

    return(
        <div>
            {gagnant === RoleEnum.MARINS ? (
                <div>
                     <h1>Bravo !</h1>
                     <p>Les marins ont gagnés</p>
                </div>
            ):(
                <div>
                    {pirateHaveFindSiren === undefined? (
                        <div>
                            <p>Les pirates ont presques gagnés mais arriveront-ils à trouver la sirène?</p>
                                {players.map((element) => (
                                    <div key={element.position}
                                    className={`${element.name === selectedSirene?.name?'bg-green-600 ':''} border border-black p-2.5`} 
                                    onClick={()=>setSelectedSiren(element)}>
                                        {element.name}
                                    </div>
                                ))}

                                <button onClick={()=>validate()}
                                    disabled={selectedSirene===undefined}>Valider</button>
                        </div>
                    ):(
                    <div>
                        <p>Bravo {pirateHaveFindSiren? 'les Pirates ont gagnés':'la Sirene a gagné'} la partie</p>
                    </div>
                    )}
                 
                </div>
                )
            }
           
        </div>
    )
}