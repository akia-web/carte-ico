import { Player } from "./player.dto";

export interface FlippedCartProps {
    onClickAction: () => void;
    srcBack: string;
    srcFront: string;
    width?:string;
    height?:string;
    selectedPlayer?: Player;
    className?: string;
    widthNumber?:number;
    heightNumber?: number;

}