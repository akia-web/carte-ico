import { StepEnum } from "@/app/enum/stepEnum";
import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/game";
import { useEffect, useState } from "react";

export default function ChooseName() {
    const {players, setName, changeView} = useGame();
    const [nameChoose, setNameChoose] =useState<string>('')
    const [selectPlayerIndex, setSelectedPlayerIndex] = useState<number>(0)
    const totalPlayers = players.length;
    const [selectedPlayer, setSelectedPlayer] = useState<Player>(players[0])
    const [validName, setValidName] = useState<boolean>(false)

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
        console.log(totalPlayers)
        if(totalPlayers> (selectPlayerIndex + 1)){
            console.log(selectPlayerIndex)
           setSelectedPlayerIndex(selectPlayerIndex + 1)
           setValidName(false)
        }else{
            changeView(StepEnum.CAPITAINE)
        }
    }
    
    return(
       <div>
        {selectedPlayer && selectedPlayer.name && validName?(
            <div>
                <h1>Player {selectedPlayer.name}</h1>
                    <div>
                        <p>{selectedPlayer.role}</p>
                        <p>{selectedPlayer.bonus}</p>
                        <button onClick={()=>nextPlayer()}>Suivant</button>
                    </div>
            </div>
        ):(
            <div>
                <h1>Player {selectedPlayer?.position}</h1>
                <form action="" onSubmit={validate}>
                <label htmlFor="">Nom</label>
                <input type="text" onChange={(e) => setNameChoose(e.target.value)} />
                <button>Valider</button>
                </form>
            </div>
            
        )}
      
       </div>
    )
}