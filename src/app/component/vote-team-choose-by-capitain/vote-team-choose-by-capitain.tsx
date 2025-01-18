import { useGame } from "@/app/provider/game.provider";
import Image from 'next/image'
import { Button } from "primereact/button";

export default function VoteTeamChooseByCapitain() {
    const {capitain, equipe, responseEquipeChooseByCapitain} = useGame();

    return(

        <div className="flex flex-col items-center w-[80%] m-auto justify-center mt-8">
            <div className="bg-blueColor rounded-lg flex items-center p-2.5 mb-8">
                <h1 className="text-xl text-center text-white"> Les Moussaillons choisis </h1>
            </div>
            <div>
            {equipe.map((element) => (
                <div key={element.position}
                className="flex mb-2.5">
                <Image src={`/icons/${element.icon}.svg`} 
                height={30} 
                width={30}
                className="mr-2.5 ml-2.5" 
                alt="icone du joueur"/>
                    
                    <span>{element.name}</span>
                </div>
            ))}
            </div>
            <p className="mt-10">êtes vous d'accord ?</p>

            <div className="mt-6">
              
                <Button label="Non"
                    className="mr-2.5 bg-redColor p-2.5 text-white"
                    onClick={()=>responseEquipeChooseByCapitain(false)}/>
                <Button label="Oui"
                    className="bg-goldenColor p-2.5 text-white"
                    onClick={()=> responseEquipeChooseByCapitain(true)}/>
            </div>
        </div>
    )
}