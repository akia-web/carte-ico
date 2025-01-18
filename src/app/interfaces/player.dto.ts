import { RoleGameEnum } from "../enum/role-game.enum";

export interface Player{
    position?: number;
    name?: string;
    role: RoleGameEnum
    bonus: string
    icon:string

}