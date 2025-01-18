import { StepEnum } from "@/app/enum/stepEnum";
import { useGame } from "@/app/provider/gameProvider";
import { useEffect, useState } from "react";
import Image from 'next/image'

export default function CloseEyes() {
      const {changeView, timeToSee} = useGame();
      const [countdown, setCountdown] = useState(timeToSee);

      const audioDing = new Audio("/ding.mp3");   
      const audioDong = new Audio("/gong.mp3"); 

      useEffect(() => {
        if (countdown >= 0) {
            const timer = setTimeout(() => {
                audioDing.play().catch((error) => console.error("Erreur de lecture audio :", error));
                setCountdown((prev) => prev - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }else{
            audioDong.play().catch((error) => console.error("Erreur de lecture audio :", error));
            changeView(StepEnum.EQUIPAGE)
        }
    }, [countdown]);

    const stopTimer = () =>{
        audioDong.play().catch((error) => console.error("Erreur de lecture audio :", error));
        changeView(StepEnum.EQUIPAGE)
    }

    return(
        <div className="flex flex-col items-center w-[80%] m-auto justify-center mt-8"
        onClick={()=>{stopTimer()}}>
            <div className="bg-blueColor rounded-lg flex items-center">
                 <Image src={`/icons/spyglass.svg`} 
                                        height={30} 
                                        width={30}
                                        className="mr-2.5 ml-2.5" 
                                        alt="Chapeau de pirate"/>
                <h1 className="text-xl text-center text-white p-2.5"> Phase d'observation</h1>
            </div>
            <div className="mt-8">
                <p className="text-center">Les joueurs ferment les yeux</p>
                <p className="text-center">Les pirates et la sirène ouvrent les yeux </p>
            </div>
            <p className="text-2xl text-goldenColor mt-8">{countdown}</p>
            <p className="italic text-sm mt-8">Arretez le timer en appuyant sur l'écran...</p>
        </div>
    )
}