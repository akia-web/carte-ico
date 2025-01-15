import { ActionCarteEnum } from "@/app/enum/actionCarteEnum";
import { RoleEnum } from "@/app/enum/roleEnum";
import { useGame } from "@/app/provider/game";
import { useEffect, useState } from "react";

export default function PartyReveal() {
    const {expeditionActions, setWinnerParty, scoreMarins, scorePirates, maxManchesGagnantes} = useGame();
    const [gagnant, setGagnant] = useState<RoleEnum.PIRATES| RoleEnum.MARINS>(expeditionActions.includes(ActionCarteEnum.POISON)?RoleEnum.PIRATES:RoleEnum.MARINS)

    return(
        <div>
            <h1>Bravo !</h1>
            <p>Les {gagnant} ont gagnés cette manche</p>

            <h2>Score</h2>
            <div className="flex">
                <div>
                    <h2>Pirates</h2>
                    <p>{gagnant === RoleEnum.PIRATES ? scorePirates + 1 : scorePirates}/{maxManchesGagnantes}</p>
                </div>
                <div>
                    <h2>Marins</h2>
                    <p>{gagnant === RoleEnum.MARINS ? scoreMarins + 1 : scoreMarins}/{maxManchesGagnantes}</p>
                </div>
            </div>

            <button onClick={()=>setWinnerParty(gagnant)}>Continuer</button>
        </div>
    )
}