import { RoleGameEnum } from "@/app/enum/role-game.enum";
import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/game.provider";
import { useState } from "react";
import Image from 'next/image'
import { Button } from "primereact/button";
import Confetti from 'react-confetti';

export default function FinalReveal() {
    const {scoreMarins, maxWinningRound, players ,newGame} = useGame();
    const [gagnant] = useState<RoleGameEnum>(scoreMarins === maxWinningRound ? RoleGameEnum.MARINS : RoleGameEnum.PIRATES)
    const [selectedSirene, setSelectedSiren] = useState<Player | undefined>(undefined)
    const [pirateHaveFindSiren, setPirateHaveFindSiren] = useState<boolean | undefined>(undefined)

    const validate = ():void =>{
        const realSiren:Player | undefined = players.find((element)=> element.role === RoleGameEnum.SIRENE)
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
            {gagnant === RoleGameEnum.MARINS ? (
                   <div className="flex flex-col items-center w-[80%] m-auto justify-center mt-8">
                        <Confetti />
                        <div className="bg-blueColor rounded-lg flex items-center">
                            <h1 className="text-base text-center text-white p-2.5">Bravo !</h1>
                        </div>
                        <p className="mt-8">Les marins ont gagnés la partie !</p>
                        <Image src={`/icons/carte-Marins.svg`} 
                                                height={100} 
                                                width={100}
                                                className="mt-8" 
                                                alt="icone des marins"/>

                        <div className="mt-8 flex">
                            <Button label="Nouveau jeu"
                            onClick={()=>newGame()}
                            className="bg-goldenColor text-white p-1.5  w-[200px] mt-4"></Button>
                        </div>
                    </div>
            ):(
                <div>
                    {pirateHaveFindSiren === undefined? (
                        <div className="flex flex-col items-center w-[80%] m-auto justify-center mt-8">
                        <div className="bg-blueColor rounded-lg flex items-center">
                            <h1 className="text-base text-center text-white p-2.5">Les pirates ont presques gagnés !</h1>
                        </div>
                        <p className="mt-4">Qui est la sirène ?</p>
                        
                        <div className="scrollable m-auto mt-4">
                        {players.filter((element) => element.role === RoleGameEnum.PIRATES || element.role === RoleGameEnum.SIRENE)
                        .map((element) => (
                            <div
                                key={element.position}
                                className={`${
                                    element.name === selectedSirene?.name ? 'bg-goldenColor ':''} flex items-center p-1.5 cursor-pointer`}
                                onClick={() => setSelectedSiren(element)}
                            >
                                <Image src={`/icons/${element.icon}.svg`} 
                                        height={30} 
                                        width={30}
                                        className="mr-2.5 ml-2.5" 
                                        alt="icone du joueur"/>
                                {element.name}
                            </div>
                        ))}
                        </div>
                   
                        <Button label="Valider"
                            className="bg-goldenColor text-white p-1.5  w-[200px] mt-4"
                            onClick={()=>validate()}
                            disabled={selectedSirene===undefined}/>
                        </div>
                    ):(
                        <div className="flex flex-col items-center w-[80%] m-auto justify-center mt-8">
                            <Confetti />
                            <div className="bg-blueColor rounded-lg flex items-center">
                                <h1 className="text-base text-center text-white p-2.5">Bravo !</h1>
                            </div>
                            <p className="mt-8">{pirateHaveFindSiren? 'les Pirates ont gagnés':'la Sirene a gagné'} la partie!</p>
                            <Image src={`/icons/carte-${pirateHaveFindSiren? 'Pirates': 'Sirène'}.svg`} 
                                                    height={100} 
                                                    width={100}
                                                    className="mt-8" 
                                                    alt="icone des marins"/>

                            <div className="mt-8 flex">
                                <Button label="Nouveau jeu"
                                onClick={()=>newGame()}
                                className="bg-goldenColor text-white p-1.5  w-[200px] mt-4"></Button>
                            </div>
                        </div>
                    )}
                 
                </div>
                )
            }
           
        </div>
    )
}