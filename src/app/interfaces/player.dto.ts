import { RoleEnum } from "../enum/roleEnum";

export interface Player{
    position?: number;
    name?: string;
    role: RoleEnum
    bonus: string

}