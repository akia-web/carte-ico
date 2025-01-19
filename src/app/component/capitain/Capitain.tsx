import { StepEnum } from "@/app/enum/step.enum";
import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/game.provider";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { Button } from "primereact/button";

export default function Capitain() {
      const {tour, players, setCaptain, captain, changeView} = useGame();
      const [affichePageTitle, setAffichePageTitle] = useState<boolean>(true)
      const [selectCapitain, setSelectCapitain] = useState<Player|undefined>(undefined)
     
      useEffect(() => {
        setAffichePageTitle(true)
      }, []);

      const validate = () =>{
        if(selectCapitain){
            setCaptain(selectCapitain)
        }
      }

    return(
      <div className="mt-8">
        {affichePageTitle && tour === 1?(
          <div className="flex flex-col items-center w-[80%] m-auto mt-8 p-4 justify-center"
            onClick={()=> setAffichePageTitle(false)}>
                <div className="bg-blueColor rounded-lg flex items-center">
                  <Image src={`/Illustrations/pirate-hat.svg`} 
                          height={30} 
                          width={30}
                          className="mr-2.5 ml-2.5" 
                          alt="Chapeau de pirate"/>
                  <h1 className="text-xl text-center text-white p-2.5"> Choix du capitaine</h1>
                </div>
                <Image src="/Illustrations/capitain.svg" 
                      height={100} 
                      width={300} 
                      alt="image capitaine"
                      className="mb-4 mt-4"/>
                <span className="italic">Appuyez pour continuer...</span>
          </div>
        ):(
        <div className="flex justify-center items-center flex-col">
          {tour === 1? (
          <div className="flex flex-col items-center w-[80%] m-auto justify-center">
              <div className="bg-blueColor rounded-lg flex items-center">
                <Image src={`/Illustrations/pirate-hat.svg`} 
                        height={30} 
                        width={30}
                        className="mr-2.5 ml-2.5" 
                        alt="Chapeau de pirate"/>
                <h1 className="text-xl text-center text-white p-2.5"> Choix du capitaine</h1>
              </div>

              <div className="scrollable m-auto mt-4">
               {players.map((element) => (
                     <div key={element.position}
                     className={`${element.position === selectCapitain?.position?'bg-goldenColor ':''} flex items-center p-1.5 cursor-pointer`} 
                     onClick={()=>setSelectCapitain(element)}>
                        <Image src={`/icons/${element.icon}.svg`} 
                        height={30} 
                        width={30}
                        className="mr-2.5 ml-2.5" 
                        alt="icone du joueur"/>
                          
                          <span>{element.name}</span>
                     </div>
                 ))}
             </div>
             <Button label="Valider le Capitaine"
               disabled={selectCapitain===undefined}
               onClick={()=>validate()}
               className="bg-goldenColor text-white p-1.5  w-[200px] mt-4"/>
            </div>
          ):(

            <div className="flex flex-col items-center w-[80%] m-auto justify-center">
            <div className="bg-blueColor rounded-lg flex items-center p-2.5 mb-8">
              <h1 className="text-sm text-center text-white"> Nouveau capitaine : </h1>
              <Image src={`/icons/${captain?.icon}.svg`}
                        height={30} 
                        width={30}
                        className="mr-2.5 ml-2.5" 
                        alt="icone du joueur"/>
              <h1 className="text-sm text-center text-white">{captain?.name}</h1>
            </div>
            <span onClick={()=> changeView(StepEnum.EQUIPAGE)}
                className="italic text-sm">Taper pour continuer</span>
            </div>
          )}
      
        </div>
            
        )}
      </div>
    )
}