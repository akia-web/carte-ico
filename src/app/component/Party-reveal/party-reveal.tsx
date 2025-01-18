import { ActionCarteEnum } from "@/app/enum/action-carte.enum";
import { RoleGameEnum } from "@/app/enum/role-game.enum";
import { useGame } from "@/app/provider/game.provider";
import { useEffect, useState } from "react";
import Image from 'next/image'
import FlippedCart from "@/app/component/flipped-card/flipped-card";
import { Button } from "primereact/button";


export default function PartyReveal() {
    const {expeditionActions, setWinnerParty, scoreMarins, scorePirates, maxManchesGagnantes} = useGame();
    const [gagnant, setGagnant] = useState<RoleGameEnum.PIRATES| RoleGameEnum.MARINS>(expeditionActions.includes(ActionCarteEnum.POISON)?RoleGameEnum.PIRATES:RoleGameEnum.MARINS)
    const [carte1Reveal, setCarte1Reveal] = useState<boolean>(false)
    const [carte2Reveal, setCarte2Reveal] = useState<boolean>(false)
    const [carte3Reveal, setCarte3Reveal] = useState<boolean>(false)

    const setRevealIndex = (index: number) => {
        if(index === 0){
            setCarte1Reveal(true)
        }else if(index === 1){
            setCarte2Reveal(true)
        }else if(index === 2){
            setTimeout(() => {
                setCarte3Reveal(true)
            }, 2000);
          
        }
    }
    return(
        <div className="flex justify-center items-center flex-col mt-8">
            
            {carte1Reveal && carte2Reveal && carte3Reveal ? (

            <div className="flex flex-col items-center w-[80%] m-auto justify-center">
                <div className="bg-blueColor rounded-lg flex items-center">
                    
                    <Image src={`/icons/dice.svg`} 
                        height={30} 
                        width={30}
                        className="mr-2.5 ml-2.5" 
                        alt="dés de jeux"/>
                    <h1 className="text-base text-center text-white p-2.5"> Résultat</h1>
                </div>
                <Image src={`/icons/carte-${gagnant}.svg`}
                    width={170}
                    height={170}
                    className="mt-8 mb-8"
                    alt={`carte rôle ${gagnant}}`}/>

                <p>Les {gagnant} ont gagnés cette manche</p>
                <Button label="Continuer"
                    onClick={()=>setWinnerParty(gagnant)}
                    className="bg-goldenColor text-white p-1.5  w-[200px] mt-8"/>
                </div>
            ):(

                <div className="flex flex-col items-center w-[80%] m-auto justify-center">
                <div className="bg-blueColor rounded-lg flex items-center">
                    
                    <h1 className="text-base text-center text-white p-2.5"> Resultat de la partie</h1>
                </div>
 
                <div className="flex mt-8">
                    {expeditionActions.map((element, index) => (
                        <FlippedCart
                        key={index}
                        width="w-[100px]"
                        height="h-[100px]"
                        className="mr-2.5"
                        widthNumber={100}
                        heightNumber={100}
                        srcBack="/icons/dos-actions.svg"
                        srcFront={`/icons/carte-action-${element}.svg`}
                        onClickAction={()=>setRevealIndex(index)}
                    />
                    ))}
                </div>

                <p className="text-sm italic mt-10">Retournez les cartes pour découvrir le résultat</p>

                </div>
            )}
            
            
        </div>
    )
}