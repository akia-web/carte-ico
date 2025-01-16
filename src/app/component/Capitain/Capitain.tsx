import { StepEnum } from "@/app/enum/stepEnum";
import { Player } from "@/app/interfaces/player.dto";
import { useGame } from "@/app/provider/game";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { Button } from "primereact/button";

export default function Capitain() {
      const {tour, players, setCapitain, capitain, changeView} = useGame();
      const [affichePageTitle, setAffichePageTitle] = useState<boolean>(true)
      const [selectCapitain, setSelectCapitain] = useState<Player|undefined>(undefined)
     
      useEffect(() => {
        setAffichePageTitle(true)
      }, []);

      const validate = () =>{
        if(selectCapitain){
            setCapitain(selectCapitain)
        }
      }

    return(
      <div className="mt-8">
        {affichePageTitle && tour === 1?(
            <div onClick={()=> setAffichePageTitle(false)}
                  className="flex justify-center items-center flex-col">
              <h1 className="text-2xl text-center bg-primaryDarkColor text-white p-2.5 mb-2.5"> Choix du capitaine</h1>
              <Image src="/Illustrations/capitain.svg" 
                      height={100} 
                      width={300} 
                      alt="image capitaine"
                      className="mb-4"/>
              <span className="italic">Appuyez pour continuer...</span>
            </div>
        ):(
        <div className="flex justify-center items-center flex-col">
          {tour === 1? (
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-2xl text-center bg-primaryDarkColor text-white p-2.5 mb-2.5">Selectionner le capitaine</h1>

            <div className="scrollable m-auto">
              {players.map((element) => (
                    <div key={element.position}
                    className={`${element.position === selectCapitain?.position?'bg-goldenColor ':''} border-b border-b-black p-2.5`} 
                    onClick={()=>setSelectCapitain(element)}>
                        {element.name}
                    </div>
                ))}
            </div>
          
               <Button label="Valider le Capitaine"
                        disabled={selectCapitain===undefined}
                        onClick={()=>validate()}
                        className="border border-secondaryActionColor text-secondaryActionColor p-2.5  mt-8 self-center mb-4"/>
          </div>
          ):(
            <div>
              <p>Le nouveau capitaine est {capitain?.name}</p>
              <span onClick={()=> changeView(StepEnum.EQUIPAGE)}>Taper pour continuer</span>
            </div>
          )}
      
        </div>
            
        )}
      </div>
    )
}