import { StepEnum } from "@/app/enum/stepEnum";
import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/gameProvider";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import FlippedCart from "../Flipped-Card/Flipped-Card";
import Image from 'next/image'



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

    const validate = () => {
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

        <div className="flex flex-col items-center w-[80%] m-auto mt-8 p-4 justify-center">
            <div className="flex flex-col items-center bg-blueColor p-4 rounded-lg">
                <div className="flex items-center justify-center">
                    <Image src={`/icons/${selectedPlayer.icon}.svg`} 
                            height={30} 
                            width={30}
                            className="mr-2.5" 
                            alt="icone joueur"/>
                    <p className="text-white">Moussaillon {selectedPlayer?.name} </p>
                </div>
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
                    className="bg-goldenColor text-white p-1.5 mt-4 w-[200px] self-center"
                    ></Button>
                </div>
                    </div>
        </div>
        ):(
            <div className="flex flex-col items-center w-[80%] m-auto mt-8 p-4 justify-center">
                <div className="flex flex-col items-center bg-blueColor p-4 rounded-lg">
                    <div className="flex items-center justify-center">
                        <Image src={`/icons/${selectedPlayer.icon}.svg`} 
                                height={30} 
                                width={30}
                                className="mr-2.5" 
                                alt="icone joueur"/>
                        <p className="text-white">Moussaillon {selectedPlayer?.position} </p>
                    </div>
                    <input type="text" 
                            className="border p-1.5 mt-2.5 rounded-lg"
                            placeholder={`nom joueur ${selectedPlayer?.position}`}
                            onChange={(e) => setNameChoose(e.target.value)} />
                </div>
                <Button label="Valider"
                        onClick={()=>validate()}
                        className="bg-goldenColor text-white p-1.5 mt-4 w-[200px]"/>
            </div>
        )}
      
       </div>
    )
}