import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/game";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

export default function Equipage() {
     const {capitain, players, setEquipe} = useGame();
     const [equipageSelected, setEquipageSelected] = useState<Player[]>([])

     const setMemberEquipe = (player: Player) => {
      
        const isPlayerInEquipage = equipageSelected.some((element) => element.position === player.position);

        if (isPlayerInEquipage) {
            setEquipageSelected((prev) => prev.filter((element) => element.position !== player.position));
        } else if (equipageSelected.length < 3) {
            setEquipageSelected((prev) => [...prev, player]);
        }
     }

     const validate = () => {
        if(equipageSelected.length === 3){
            setEquipe(equipageSelected)
        }
     }
    return(
        <div className="flex justify-center items-center flex-col mt-8">
            <h1 className="text-2xl text-center bg-primaryDarkColor text-white p-2.5 mb-2.5">Avec qui {capitain?.name} veut partir en expedition?</h1>

            <div className="scrollable m-auto">
            {players.map((element) => (
                <div key={element.position}
                className={`${equipageSelected.includes(element)?'bg-goldenColor ':''} border-b border-b-black p-2.5`} 
                onClick={()=>setMemberEquipe(element)}>
                    {element.name}
                </div>
            ))}

            </div>

            <Button label="Valider l'équipage"
                                    disabled={equipageSelected.length < 3}
                                    onClick={()=>validate()}
                                    className="border border-secondaryActionColor text-secondaryActionColor p-2.5  mt-8 self-center mb-4"/>
        </div>
    )
}