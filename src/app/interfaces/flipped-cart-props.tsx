import { Player } from "./player.dto";

export interface FlippedCartProps {
    onClickAction: () => void;
    srcBack: string;
    srcFront: string;
    selectedPlayer?: Player;
    className?: string;
}