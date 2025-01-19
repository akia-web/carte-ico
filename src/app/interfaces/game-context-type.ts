import { RoleGameEnum } from "../enum/role-game.enum";
import { StepEnum } from "../enum/step.enum";
import { Player as Player } from "./player.dto";

export interface GameContextType {
    step:string;
    maxWinningRound:number;
    tour: number;
    players: Player[];
    captain?: Player,
    timeToSee: number,
    team:Player[],
    shippingActions: string[],
    scorePirates:number,
    scoreMarins: number,
    captainCanMakeNewEquipe: boolean
    setName: (player: Player, name:string) => void;
    initGame: (numberPlayer:number, numberManche: number, time:number) => void;
    changeView: (step:StepEnum) => void;
    setCaptain:(player:Player)=> void;
    setTeam:(players:Player[])=> void;
    setShippingActions:(actions: string[])=> void;
    setWinnerParty:(winner: RoleGameEnum.PIRATES | RoleGameEnum.MARINS)=> void;
    responseTeamChooseByCapitain:(response: boolean)=>void,
    newGame:()=>void,
 
}