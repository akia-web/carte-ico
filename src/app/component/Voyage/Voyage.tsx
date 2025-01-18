import { ActionCarteEnum } from "@/app/enum/actionCarteEnum";
import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/gameProvider";
import { useEffect, useState } from "react"
import Image from 'next/image'
import { RoleGameEnum } from "@/app/enum/roleGameEnum";
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
        if(selectedMember.role === RoleGameEnum.PIRATES){
            const actions:{action:ActionCarteEnum, order:number}[] = [{action:ActionCarteEnum.ILE, order:1}, {action:ActionCarteEnum.POISON, order:2}]
            actions.sort(() => Math.random() - 0.5);
            setPossibilityChoice(actions)
        }else{
            setPossibilityChoice([{action:ActionCarteEnum.ILE, order:1}, {action:ActionCarteEnum.ILE, order:2}])
        }
    }, [selectedMember])

    const setAction = () =>{
        if(selectedAction){
            setAllSelectedAction((prev) => [...prev, selectedAction.action]);     
        }
   
    }

    return(
        <div>
        {affichePageTitle?(
            <div className="flex flex-col items-center w-[80%] m-auto justify-center mt-8"
            onClick={()=> setAffichePageTitle(false)}>
                <div className="bg-blueColor rounded-lg flex items-center">
                    
                    <Image src={`/icons/compass.svg`} 
                        height={30} 
                        width={30}
                        className="mr-2.5 ml-2.5" 
                        alt="compas"/>

                    <h1 className="text-base text-center text-white p-2.5"> L'équipage part en expedition</h1>
                </div>
                <div className="mb-8 flex mt-28">
                <Image src="/icons/ship.svg" 
                    height={100} 
                    width={100} 
                    alt="illustration bateau"/>
                <Image src="/icons/island.svg" 
                height={100} 
                width={100} 
                alt="illustration ile"
                />
                </div>
                <span className="italic text-sm">Cliquez pour continuer</span>
            </div>
        ):(
            <div className="flex flex-col items-center w-[80%] m-auto justify-center mt-8">
                <div className="bg-blueColor rounded-lg flex items-center">
                    
                    <Image src={`/icons/${selectedMember.icon}.svg`} 
                        height={30} 
                        width={30}
                        className="mr-2.5 ml-2.5" 
                        alt="compas"/>

                    <h1 className="text-base text-center text-white p-2.5"> {selectedMember.name} choisi une carte</h1>
                </div>
                
                <div className="flex mt-4">
               {possibilityChoice.map((element) => (
                    <div key={element.order}
                    onClick={()=>setSelectedAction(element)}>
                        <Image src={`/cartes/Actions/${element.action}.svg`} 
                        width={170} 
                        height={296} 
                        alt={`image carte ${element.action}`}
                        className={`${element.order === selectedAction?.order?'border border-goldenColor ':''}`} 
                        ></Image>
                    </div>
                ))}

               </div>
               <Button label="Valider le choix"
                    disabled={selectedAction === undefined}
                    onClick={()=>setAction()}
                    className="bg-goldenColor text-white p-1.5  w-[200px] mt-8"/>

            </div>
        )}
        </div>
    )
}