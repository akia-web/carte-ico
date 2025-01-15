import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/game";
import { useEffect, useState } from "react";

export default function Equipage() {
     const {capitain, players, setEquipe} = useGame();
     const [equipageSelected, setEquipageSelected] = useState<Player[]>([])

    useEffect(()=>{
        console.log(equipageSelected)
    },[equipageSelected])


     const setMemberEquipe = (player: Player) => {
      
        const isPlayerInEquipage = equipageSelected.some((element) => element.position === player.position);

        if (isPlayerInEquipage) {
            setEquipageSelected((prev) => prev.filter((element) => element.position !== player.position));
        } else if (equipageSelected.length < 3) {
            setEquipageSelected((prev) => [...prev, player]);
        }
     }

     const validate = () => {
        if(equipageSelected.length = 3){
            setEquipe(equipageSelected)
        }
     }
    return(
        <div>
            <h1>Avec qui {capitain?.name} veut partir en expédition?</h1>

            {players.map((element) => (
                <div key={element.position}
                className={`${equipageSelected.includes(element)?'bg-green-600 ':''} border border-black p-2.5`} 
                onClick={()=>setMemberEquipe(element)}>
                    {element.name}
                </div>
            ))}

            <button onClick={()=>validate()}>Valider</button>
        </div>
    )
}