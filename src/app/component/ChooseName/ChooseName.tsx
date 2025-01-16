import { StepEnum } from "@/app/enum/stepEnum";
import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/game";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import FlippedCart from "../Flipped-Card/Flipped-Card";


export default function ChooseName() {
    const {players, setName, changeView} = useGame();
    const [nameChoose, setNameChoose] =useState<string>('')
    const [selectPlayerIndex, setSelectedPlayerIndex] = useState<number>(0)
    const totalPlayers = players.length;
    const [selectedPlayer, setSelectedPlayer] = useState<Player>(players[0])
    const [validName, setValidName] = useState<boolean>(false)
    const [hasFlippedRole, setHasFlippedRole] = useState<boolean>(false)
    const [hasFlippedBonus, setHasFlippedBonus] = useState<boolean>(false)

    const dossierRole : string = '/cartes/Roles/'
    const srcRoleBack:string=`${dossierRole}dos.svg`;
    const srcRoleFront:string=`${dossierRole}${selectedPlayer.role}.svg`
    const dossierBonus : string = '/cartes/Bonus/'
    const srcBonusBack:string=`${dossierBonus}dos.svg`
    const srcBonusFront:string=`${dossierBonus}${selectedPlayer.bonus}.svg`

    useEffect(() => {
        const updatePlayer = selectedPlayer
        updatePlayer.name = nameChoose
        setSelectedPlayer(updatePlayer)  
    }, [nameChoose]);

    useEffect(() => {
        setSelectedPlayer(players[selectPlayerIndex])
    }, [selectPlayerIndex]);

    const validate = (e: React.FormEvent) => {
        e.preventDefault()
        setValidName(true)
        setName(selectedPlayer, nameChoose)
    }

    const nextPlayer = () => {
        if(totalPlayers> (selectPlayerIndex + 1)){
           setSelectedPlayerIndex(selectPlayerIndex + 1)
           setValidName(false)
           setHasFlippedBonus(false);
           setHasFlippedRole(false)
        }else{
            changeView(StepEnum.CAPITAINE)
        }
    }
    
    return(
       <div>
        {selectedPlayer && selectedPlayer.name && validName?(
            <div className="w-[80%] m-auto border mt-8">
            <div className="flex flex-col justify-center">
                <div className="shadow">
                    <div className="bg-primaryDarkColor text-white h-14 flex justify-center items-center">
                        <h1>Moussaillon {selectedPlayer.name}</h1>
                    </div>
                    <div className="px-8 flex flex-col">
                            <div className="flex flex-col mt-2.5">
                                <div className="flex">
                                    <FlippedCart
                                    onClickAction={()=> setHasFlippedRole(true)}
                                    srcBack={srcRoleBack}
                                    srcFront={srcRoleFront}
                                    selectedPlayer={selectedPlayer}
                                    className="mr-2"/>

                                    <FlippedCart
                                    onClickAction={()=> setHasFlippedBonus(true)}
                                    srcBack={srcBonusBack}
                                    srcFront={srcBonusFront}
                                    selectedPlayer={selectedPlayer}/>
                                </div>                              
                                
                                <Button label="Joueur suivant"
                                disabled={!hasFlippedRole || !hasFlippedBonus}
                                onClick={()=>nextPlayer()}
                                className="border border-secondaryActionColor text-secondaryActionColor p-2.5  mt-8 self-center mb-4"
                                ></Button>
                            </div>
                    </div>
                </div>
            </div>
        </div>


        ):(
            <div className="w-[80%] m-auto border mt-8">
                <div className="flex flex-col justify-center">
                    <div className="shadow">
                        <div className="bg-primaryDarkColor text-white h-14 flex justify-center items-center">
                            <h1>Moussaillon {selectedPlayer?.position}</h1>
                        </div>
                        <div className="px-8 flex flex-col">
                                <form className="flex flex-col mt-2.5"
                                 onSubmit={validate}>
                                    <label htmlFor="">Nom</label>
                                    <input type="text" 
                                           className="border p-2.5"
                                           onChange={(e) => setNameChoose(e.target.value)} />
                                    <Button label="Valider"
                                    className="border border-secondaryActionColor text-secondaryActionColor p-2.5  mt-8 self-center mb-4"
                                    ></Button>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        )}
      
       </div>
    )
}