import { useGame } from "@/app/provider/game";

export default function VoteEquipeChooseByCapitain() {
    const {capitain, equipe, responseEquipeChooseByCapitain} = useGame();

    return(
        <div>
            <h1>Le capitaine {capitain?.name} a chosit l'équipage suivant :</h1>
            
            <p>êtes vous d'accord ?</p>
            <button onClick={()=> responseEquipeChooseByCapitain(true)}>Oui</button>
            <button onClick={()=>responseEquipeChooseByCapitain(false)}>Non</button>
        </div>
    )
}