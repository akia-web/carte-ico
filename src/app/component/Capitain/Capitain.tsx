import { StepEnum } from "@/app/enum/stepEnum";
import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/game";
import { useEffect, useState } from "react";

export default function Capitain() {
      const {tour, players, setCapitain, capitain, changeView} = useGame();
      const [affichePageTitle, setAffichePageTitle] = useState<boolean>(true)
      const [selectCapitain, setSelectCapitain] = useState<Player|undefined>(undefined)
     
      useEffect(() => {
        setAffichePageTitle(true)
      }, []);

      const validate = () =>{
        if(selectCapitain){
            setCapitain(selectCapitain)
        }
      }

    return(
      <div>
        {affichePageTitle?(
            <div onClick={()=> setAffichePageTitle(false)}>
            <h1> Choix  capitaine</h1>
            <span>Appuyez pour continuer</span>
            </div>
        ):(
        <div>
          {tour === 1? (
          <div>
            <h1>Sélectionner le capitaine</h1>

            {players.map((element) => (
                  <div key={element.position}
                  className={`${element.name === selectCapitain?.name?'bg-green-600 ':''} border border-black p-2.5`} 
                  onClick={()=>setSelectCapitain(element)}>
                      {element.name}
                  </div>
              ))}

            <button onClick={()=>validate()}
                disabled={selectCapitain===undefined}>Valider</button>
          </div>
          ):(
            <div>
              <p>Le nouveau capitaine est {capitain?.name}</p>
              <span onClick={()=> changeView(StepEnum.EQUIPAGE)}>Taper pour continuer</span>
            </div>
          )}
      
        </div>
            
        )}
      </div>
    )
}