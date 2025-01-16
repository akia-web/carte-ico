import { ActionCarteEnum } from "@/app/enum/actionCarteEnum";
import { RoleEnum } from "@/app/enum/roleEnum";
import { useGame } from "@/app/provider/game";
import { useEffect, useState } from "react";
import Image from 'next/image'
import FlippedCart from "../Flipped-Card/Flipped-Card";
import { Button } from "primereact/button";


export default function PartyReveal() {
    const {expeditionActions, setWinnerParty, scoreMarins, scorePirates, maxManchesGagnantes} = useGame();
    const [gagnant, setGagnant] = useState<RoleEnum.PIRATES| RoleEnum.MARINS>(expeditionActions.includes(ActionCarteEnum.POISON)?RoleEnum.PIRATES:RoleEnum.MARINS)
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
                <div className="flex justify-center items-center flex-col mt-8">
                    <h1 className="text-2xl text-center bg-primaryDarkColor text-white p-2.5 mb-2.5">Bravo !</h1>
                    <p>Les {gagnant} ont gagnés cette manche</p>
                    
                    <Image src={`/cartes/Roles/${gagnant}.svg`}
                            width={170}
                            height={296}
                            alt={`carte rôle ${gagnant}}`}/>


                    <Button label="Continuer"
                            onClick={()=>setWinnerParty(gagnant)}
                            className="border border-secondaryActionColor text-secondaryActionColor p-2.5  mt-8 self-center mb-4"/>
                </div>

            ):(
                <div className="flex justify-center items-center flex-col mt-8">
                    <h1 className="text-2xl text-center bg-primaryDarkColor text-white p-2.5 mb-2.5">Resultat de la partie</h1>
                    <div className="flex">
                        {expeditionActions.map((element, index) => (
                            <FlippedCart
                            key={index}
                            srcBack="/cartes/Actions/dos.svg"
                            srcFront={`/cartes/Actions/${element}.svg`}
                            onClickAction={()=>setRevealIndex(index)}
                        />
                        ))}
                    </div>
                </div>
            )}
            
            
        </div>
    )
}