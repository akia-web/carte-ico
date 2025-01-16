import { RoleEnum } from "../enum/roleEnum";
import { StepEnum } from "../enum/stepEnum";
import { Player as Player } from "./player.dto";

export interface GameContextType {
    step:string;
    maxManchesGagnantes:number;
    tour: number;
    players: Player[];
    capitain?: Player,
    timeToSee: number,
    equipe:Player[],
    expeditionActions: string[],
    scorePirates:number,
    scoreMarins: number,
    capitainCanMakeNewEquipe: boolean
    setName: (player: Player, name:string) => void;
    initGame: (numberPlayer:number, numberManche: number, time:number) => void;
    changeView: (step:StepEnum) => void;
    setCapitain:(player:Player)=> void;
    setEquipe:(players:Player[])=> void;
    setExpeditionActions:(actions: string[])=> void;
    setWinnerParty:(winner: RoleEnum.PIRATES | RoleEnum.MARINS)=> void;
    responseEquipeChooseByCapitain:(response: boolean)=>void,
 
}