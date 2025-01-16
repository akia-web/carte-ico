import { ActionCarteEnum } from "@/app/enum/actionCarteEnum";
import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/game";
import { useEffect, useState } from "react"
import Image from 'next/image'
import { RoleEnum } from "@/app/enum/roleEnum";
import { Button } from "primereact/button";



export default function Voyage() {
    const [index, setIndex]= useState<number>(0)
    const [affichePageTitle, setAffichePageTitle] = useState<boolean>(true)
    const {equipe, setExpeditionActions} = useGame();
    const [selectedMember, setSelectedMember] = useState<Player>(equipe[index])
    const [selectedAction, setSelectedAction] = useState<{action:ActionCarteEnum, order:number}|undefined>(undefined)
    const [allSelectedAction, setAllSelectedAction] = useState<(ActionCarteEnum)[] >([])
    const [possibilityChoice, setPossibilityChoice] = useState<{action:ActionCarteEnum, order:number}[]>([])
    
    useEffect(()=>{
        if(index !== 0){
        setSelectedMember(equipe[index])
        setSelectedAction(undefined)
        }
    }, [index])

    useEffect(()=>{
        if(allSelectedAction.length>0){
            if(index === 2){
                setExpeditionActions(allSelectedAction)
            }else{
                setIndex((prev)=> prev+1) 
            }
        }
       
    }, [allSelectedAction])

    useEffect(()=>{
        if(selectedMember.role === RoleEnum.PIRATES){
            const actions:{action:ActionCarteEnum, order:number}[] = [{action:ActionCarteEnum.ILE, order:1}, {action:ActionCarteEnum.POISON, order:2}]
            actions.sort(() => Math.random() - 0.5);
            setPossibilityChoice(actions)
        }else{
            setPossibilityChoice([{action:ActionCarteEnum.ILE, order:1}, {action:ActionCarteEnum.ILE, order:2}])
        }
    }, [selectedMember])

    const setAction = () =>{
        console.log(index)
        console.log(selectedAction)
        if(selectedAction){
            setAllSelectedAction((prev) => [...prev, selectedAction.action]);     
        }
   
    }

    return(
        <div>
        {affichePageTitle?(
            <div onClick={()=> setAffichePageTitle(false)}
                    className="flex justify-center items-center flex-col mt-8">
                <h1 className="text-2xl text-center bg-primaryDarkColor text-white p-2.5 mb-2.5">L'equipage part en expedition</h1>
                    <Image src="/Illustrations/voyage.png" 
                                      height={100} 
                                      width={300} 
                                      alt="image capitaine"
                                      className="mb-4"/>
                
                <span className="italic">Cliquez pour continuer</span>
            </div>
        ):(
            <div className="flex justify-center items-center flex-col mt-8">
                <h1 className="text-2xl text-center bg-primaryDarkColor text-white p-2.5 mb-2.5">{selectedMember.name} choisi une carte</h1>
               
               <div className="flex">
               {possibilityChoice.map((element) => (
                    <div key={element.order}
                    onClick={()=>setSelectedAction(element)}>
                        <Image src={`/cartes/Actions/${element.action}.svg`} 
                        width={170} 
                        height={296} 
                        alt={`image carte ${element.action}`}
                        className={`${element.order === selectedAction?.order?'border border-goldenColor ':''} p-2.5`} 
                        ></Image>
                    </div>
                ))}

               </div>
               
                <Button label="Valider le choix"
                        disabled={selectedAction === undefined}
                        onClick={()=>setAction()}
                        className="border border-secondaryActionColor text-secondaryActionColor p-2.5  mt-8 self-center mb-4"/>
            </div>
        )}
        </div>
    )
}