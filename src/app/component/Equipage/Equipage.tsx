import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/gameProvider";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import Image from 'next/image'

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

        <div className="flex flex-col items-center w-[80%] m-auto justify-center mt-8">
            <div className="bg-blueColor rounded-lg flex items-center">
                
                <Image src={`/icons/${capitain?.icon}.svg`} 
                    height={30} 
                    width={30}
                    className="mr-2.5 ml-2.5" 
                    alt="Chapeau de pirate"/>

                <h1 className="text-base text-center text-white p-2.5"> {capitain?.name} choisit son équipage</h1>
            </div>
            <div className="scrollable m-auto mt-4">
             {players.map((element) => (
                 <div key={element.position}
                 className={`${equipageSelected.includes(element)?'bg-goldenColor ':''} flex items-center p-1.5 cursor-pointer`} 
                 onClick={()=>setMemberEquipe(element)}>
                    <Image src={`/icons/${element.icon}.svg`} 
                                            height={30} 
                                            width={30}
                                            className="mr-2.5 ml-2.5" 
                                            alt="icone du joueur"/>
                                              
                    <span>{element.name}</span>
                 </div>
             ))}
          </div>
          <Button label="Valider l'équipage"
                disabled={equipageSelected.length < 3}
                onClick={()=>validate()}
                className="bg-goldenColor text-white p-1.5  w-[200px] mt-4"/>
        </div>
    )
}