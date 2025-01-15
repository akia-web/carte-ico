import { StepEnum } from "@/app/enum/stepEnum";
import { useGame } from "@/app/provider/game";
import { useEffect, useState } from "react";

export default function CloseEyes() {
      const {changeView, timeToSee} = useGame();
      const [countdown, setCountdown] = useState(timeToSee);

      const audioDing = new Audio("/ding.mp3");   
      const audioDong = new Audio("/gong.mp3"); 

      useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                audioDing.play().catch((error) => console.error("Erreur de lecture audio :", error));
                setCountdown((prev) => prev - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }else{
            audioDong.play().catch((error) => console.error("Erreur de lecture audio :", error));
            setTimeout(() => {
                changeView(StepEnum.EQUIPAGE)
            }, 4000);
        }
    }, [countdown]);

    return(
        <div>
            <p>Les joueurs ferment les yeux</p>
            <p>Les pirates et la sirène ouvrent les yeux </p>
            {countdown}
        </div>
    )
}