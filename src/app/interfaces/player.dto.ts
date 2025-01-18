import { RoleGameEnum } from "../enum/roleGameEnum";

export interface Player{
    position?: number;
    name?: string;
    role: RoleGameEnum
    bonus: string
    icon:string

}