import { ActionCarteEnum } from "@/app/enum/actionCarteEnum";
import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/game";
import { useEffect, useState } from "react"

export default function Voyage() {
    const [index, setIndex]= useState<number>(0)
    const [affichePageTitle, setAffichePageTitle] = useState<boolean>(true)
    const {equipe, setExpeditionActions} = useGame();
    const [selectedMember, setSelectedMember] = useState<Player>(equipe[index])
    const [selectedAction, setSelectedAction] = useState<ActionCarteEnum | undefined>(undefined)
    const [allSelectedAction, setAllSelectedAction] = useState<(ActionCarteEnum)[] >([])
    
    useEffect(()=>{
        if(index !== 0){
        setSelectedMember(equipe[index])
        setSelectedAction(undefined)
        }
    }, [index])

    const setAction = () =>{
        if(selectedAction){
            setAllSelectedAction((prev) => [...prev, selectedAction]);
            console.log(index)
                if(index === 2){
                    console.log('je dois set expe + changer de vue')
                    setExpeditionActions(allSelectedAction)
                }else{
                    console.log('je change de joueur')
                    setIndex((prev)=> prev+1) 
                    
                }
        }
   
    }

    return(
        <div>
        {affichePageTitle?(
            <div onClick={()=> setAffichePageTitle(false)}>
                <h1>L'équipage part en expédition</h1>
                <span>Cliquez pour continuer</span>
            </div>
        ):(
            <div>
                <h1>{selectedMember.name} choisi une carte</h1>
                <div onClick={() => setSelectedAction(ActionCarteEnum.POISON)}
                    className={selectedAction?.includes(ActionCarteEnum.POISON)?'bg-green-600 ':''}>Poison</div>
                <div onClick={() => setSelectedAction(ActionCarteEnum.ILE)}
                    className={selectedAction?.includes(ActionCarteEnum.ILE)?'bg-green-600 ':''}>Ile</div>
                <button onClick={()=> setAction()}>Valider</button>
            </div>
        )}
        </div>
    )
}