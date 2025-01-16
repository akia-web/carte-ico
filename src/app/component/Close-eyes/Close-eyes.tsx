import { StepEnum } from "@/app/enum/stepEnum";
import { useGame } from "@/app/provider/game";
import { useEffect, useState } from "react";

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
        <div className="flex justify-center items-center flex-col mt-8"
        onClick={()=>{stopTimer()}}>
            <h1 className="text-2xl text-center bg-primaryDarkColor text-white p-2.5 mb-2.5">Decouverte des pirates et de la sirene.</h1>
            
            <div className="mt-8">
            <p className="text-center">Les joueurs ferment les yeux</p>
            <p className="text-center">Les pirates et la sirène ouvrent les yeux </p>
            </div>
      
            <p className="text-2xl text-goldenColor mt-8">{countdown}</p>
            <p className="italic text-sm mt-8">Arretez le timer en appuyant sur l'écran...</p>
        </div>
    )
}