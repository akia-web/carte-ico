"use client";

import { Context, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { GameContextType } from "../interfaces/game-context-type";

import { StepEnum } from "../enum/stepEnum";
import { Player } from "../interfaces/player.dto";
import { RoleEnum } from "../enum/roleEnum";
import { BonusEnum } from "../enum/bonusEnum";

export const GameContext: Context<GameContextType> = createContext<GameContextType>({
    tour: 1,
    timeToSee:0,
    setName: (): void => {
    },
    initGame: (): void => {
    },
    changeView: (): void => {
    },
    step:'',
    maxManchesGagnantes:0,
    players:[],
    capitain:undefined,
    setCapitain: (): void => {
    },
    setEquipe: (): void => {
    },
    equipe:[],
    expeditionActions:[],
    setExpeditionActions:(): void => {
    },
    setWinnerParty:(): void => {},
    scorePirates:0,
    scoreMarins: 0,
    responseEquipeChooseByCapitain:():void =>{},
    capitainCanMakeNewEquipe: true

});

export const GameProvider = ({children}: { children: ReactNode }) => {
    const [tour, setTour] = useState<number>(1);
    const [maxManches, setmaxManches] = useState<number>(0);
    const [numberPlayers, setNumberPlayers] = useState<number>(0);
    const [step, setStep] = useState<string>(StepEnum.INIT);
    const [players, setPlayers] = useState<Player[]>([]);
    const [capitain, setSelectedCapitain] = useState<Player |undefined>(undefined);
    const [timeToSee, setTimeToSee] = useState<number>(0);
    const [equipe, setSelectedEquipe] = useState<Player[]>([])
    const [expeditionActions, setExpeditionActionParty] = useState<string[]>([])
    const[scoreMarins, setScoreMarins]= useState<number>(0);
    const[scorePirates, setScorePirates]= useState<number>(0);
    const[capitainCanMakeNewEquipe, setCapitainCanMakeNewEquipe]= useState<boolean>(true);

    const setName = (player: Player, name:string): void => {
       const findPlayerIndex =  players.findIndex((element)=>element.position === player.position)
       players[findPlayerIndex].name = name
       setPlayers(players)
    }

    const setCapitain = (player: Player) =>{
        setSelectedCapitain(player)
        if(tour === 1){
            setStep(StepEnum.CLOSE_EYES)
        }else{
            setStep(StepEnum.EQUIPAGE)
        }
    }

    
    const setEquipe= (players: Player[]) =>{
        setSelectedEquipe(players);
        if(tour === 1){
            changeView(StepEnum.VOTE_VOYAGE)
        }else{
            changeView(StepEnum.VOTE_EQUIPAGE)
        }
    }

    const setExpeditionActions = (actions: string[])=>{
        if(actions.length < 3){
            console.log(`taille du tableau des actions : ${actions.length}`)
        }
        setExpeditionActionParty(actions)
        changeView(StepEnum.PARTY_REVEAL)
    }

    const setWinnerParty = (winner: RoleEnum.PIRATES | RoleEnum.MARINS) => {
        winner === RoleEnum.PIRATES ? setScorePirates((prev)=>prev+=1):setScoreMarins((prev)=>prev+=1)
    }

    useEffect(()=>{
        if(maxManches !== 0 )
        if(scorePirates === maxManches || scoreMarins === maxManches){
            changeView(StepEnum.FINAL_REVEAL)
        }else{
            setSelectedEquipe([])
            setExpeditionActionParty([])
            setTour((prev)=> prev+=1)
            getNextCapitain()
            changeView(StepEnum.CAPITAINE)
        }

    },[scorePirates, scoreMarins])

    const initGame = (numberPlayer:number, numberManche:number, time: number) : void => {
        setmaxManches(numberManche);
        setNumberPlayers(numberPlayer);
        setRolesBonusAndPlayers(numberPlayer)
        setTimeToSee(time)
        setStep(StepEnum.CHOOSE_NAME)
    }


    const changeView = (name: StepEnum) => {
        setStep(name);
    }


    const setRolesBonusAndPlayers = (numberPlayer: number) =>{
        let sirene = 1
        let pirate = Math.floor((numberPlayer - 1) / 2 )
        let marins = numberPlayer - sirene - pirate
        let index = 1
        let bonus = Object.values(BonusEnum);
        const resultPlayers : Player[] = []
        let indexBonus = Math.floor(Math.random() * bonus.length)
        //sirene
        resultPlayers.push(addPlayerToList(bonus[indexBonus], RoleEnum.SIRENE))
        bonus = bonus.filter(element=> element !== bonus[indexBonus])

        for(let i = 0; i<pirate; i++){
            indexBonus = Math.floor(Math.random() * bonus.length)
            resultPlayers.push(addPlayerToList(bonus[indexBonus], RoleEnum.PIRATES))
            bonus = bonus.filter(element=> element !== bonus[indexBonus])
        }

        for(let i = 0; i<marins; i++){
            indexBonus = Math.floor(Math.random() * bonus.length)
            resultPlayers.push(addPlayerToList(bonus[indexBonus], RoleEnum.MARINS))
            bonus = bonus.filter(element=> element !== bonus[indexBonus])
        }


        resultPlayers.sort(() => Math.random() - 0.5);
        resultPlayers.forEach((element)=>{
            element.position = index;
            index+=1
        })
        setPlayers(resultPlayers)
    }

    const getNextCapitain = ()=>{
        if(capitain && capitain.position && capitain.position === players.length){
            setCapitain(players[0])
          }else{
            if(capitain && capitain.position){
              const newCapitain = players.find((element)=> element.position === capitain.position  as number +1)
              if(newCapitain){
                setCapitain(newCapitain)
              }
            }
          }
    }

    const responseEquipeChooseByCapitain = (response:boolean) =>{
        if(response){
            changeView(StepEnum.VOTE_VOYAGE)
        }else{
            setEquipe([]);
            if(capitainCanMakeNewEquipe){
                setCapitainCanMakeNewEquipe(false)
                changeView(StepEnum.EQUIPAGE)
                return
            }else{
                getNextCapitain();
                changeView(StepEnum.CAPITAINE)
                setCapitainCanMakeNewEquipe(true)
            }
        }
    }

    const addPlayerToList = ( bonus: string, role: RoleEnum ) => {
    
        const newPlayer : Player= {
            role: role,
            bonus
        }
        return newPlayer
    }



    return (
        <GameContext.Provider value={{tour, setName ,initGame, changeView, maxManchesGagnantes: maxManches, step, players, capitain, setCapitain, timeToSee, equipe, setEquipe, expeditionActions,setExpeditionActions, setWinnerParty, scoreMarins, scorePirates, responseEquipeChooseByCapitain, capitainCanMakeNewEquipe  }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context: GameContextType = useContext(GameContext);
    if (!context) {
        throw new Error("useCart doit être utilisé à l'intérieur de CartProvider");
    }
    return context;
};