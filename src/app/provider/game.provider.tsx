'use client';

import { Context, createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { GameContextType } from '../interfaces/game-context-type';

import { StepEnum } from '../enum/step.enum';
import { Player } from '../interfaces/player.dto';
import { RoleGameEnum } from '../enum/role-game.enum';
import { BonusEnum } from '../enum/bonus.enum';
import { IconsPlayersEnum } from '../enum/icons-players.enum';

export const GameContext: Context<GameContextType> = createContext<GameContextType>({
  tour: 1,
  timeToSee: 0,
  setName: (): void => {
  },
  initGame: (): void => {
  },
  changeView: (): void => {
  },
  step: '',
  maxWinningRound: 0,
  players: [],
  captain: undefined,
  setCaptain: (): void => {
  },
  setTeam: (): void => {
  },
  team: [],
  shippingActions: [],
  setShippingActions: (): void => {
  },
  setWinnerParty: (): void => {},
  scorePirates: 0,
  scoreMarins: 0,
  responseTeamChooseByCapitain: (): void => {},
  captainCanMakeNewEquipe: true,
  newGame: (): void => {}

});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [tour, setTour] = useState<number>(1);
  const [maxManches, setmaxManches] = useState<number>(0);
  const [numberPlayers, setNumberPlayers] = useState<number>(0);
  const [step, setStep] = useState<string>(StepEnum.INIT);
  const [players, setPlayers] = useState<Player[]>([]);
  const [capitain, setSelectedCapitain] = useState<Player | undefined>(undefined);
  const [timeToSee, setTimeToSee] = useState<number>(0);
  const [equipe, setSelectedEquipe] = useState<Player[]>([]);
  const [expeditionActions, setExpeditionActionParty] = useState<string[]>([]);
  const [scoreMarins, setScoreMarins] = useState<number>(0);
  const [scorePirates, setScorePirates] = useState<number>(0);
  const [capitainCanMakeNewEquipe, setCapitainCanMakeNewEquipe] = useState<boolean>(true);

  const setName = (player: Player, name: string): void => {
    const findPlayerIndex = players.findIndex((element) => element.position === player.position);
    players[findPlayerIndex].name = name;
    setPlayers(players);
  };

  const setCapitain = (player: Player) => {
    setSelectedCapitain(player);
    if (tour === 1) {
      setStep(StepEnum.CLOSE_EYES);
    } else {
      setStep(StepEnum.EQUIPAGE);
    }
  };


  const setEquipe = (players: Player[]) => {
    setSelectedEquipe(players);
    if (tour === 1) {
      changeView(StepEnum.VOTE_VOYAGE);
    } else {
      changeView(StepEnum.VOTE_EQUIPAGE);
    }
  };

  const setExpeditionActions = (actions: string[]) => {
    if (actions.length < 3) {
      console.log(`taille du tableau des actions : ${actions.length}`);
    }
    actions.sort(() => Math.random() - 0.5);
    setExpeditionActionParty(actions);
    changeView(StepEnum.PARTY_REVEAL);
  };

  const setWinnerParty = (winner: RoleGameEnum.PIRATES | RoleGameEnum.MARINS) => {
   return winner === RoleGameEnum.PIRATES ? setScorePirates((prev) => prev += 1) : setScoreMarins((prev) => prev += 1);
  };

  useEffect(() => {
    if (maxManches !== 0 && step !== StepEnum.INIT) {
      if (scorePirates === maxManches || scoreMarins === maxManches) {
        changeView(StepEnum.FINAL_REVEAL);
      } else {
        console.log('je suis la');
        console.log(step);
        setSelectedEquipe([]);
        setExpeditionActionParty([]);
        setTour((prev) => prev += 1);
        getNextCapitain();
        changeView(StepEnum.CAPITAINE);
      }
    }


  }, [scorePirates, scoreMarins]);

  const initGame = (numberPlayer: number, numberManche: number, time: number): void => {
    setmaxManches(numberManche);
    setNumberPlayers(numberPlayer);
    setRolesBonusAndPlayers(numberPlayer);
    setTimeToSee(time);
    setStep(StepEnum.CHOOSE_NAME);
  };


  const changeView = (name: StepEnum) => {
    setStep(name);
  };


  const setRolesBonusAndPlayers = (numberPlayer: number) => {
    const sirene: number = 1;
    const pirate: number = Math.floor((numberPlayer - 1) / 2);
    const marins: number = numberPlayer - sirene - pirate;
    let index: number = 1;
    let bonus: BonusEnum[] = Object.values(BonusEnum);
    let icon: IconsPlayersEnum[] = Object.values(IconsPlayersEnum);
    const resultPlayers: Player[] = [];
    let indexBonus: number = Math.floor(Math.random() * bonus.length);
    let indexIcon: number = Math.floor(Math.random() * icon.length);

    //sirene
    resultPlayers.push(addPlayerToList(bonus[indexBonus], RoleGameEnum.SIRENE, icon[indexIcon]));
    bonus = bonus.filter(element => element !== bonus[indexBonus]);
    icon = icon.filter(element => element !== icon[indexIcon]);

    for (let i = 0; i < pirate; i++) {
      indexBonus = Math.floor(Math.random() * bonus.length);
      indexIcon = Math.floor(Math.random() * icon.length);
      resultPlayers.push(addPlayerToList(bonus[indexBonus], RoleGameEnum.PIRATES, icon[indexIcon]));
      bonus = bonus.filter(element => element !== bonus[indexBonus]);
      icon = icon.filter(element => element !== icon[indexIcon]);
    }

    for (let i = 0; i < marins; i++) {
      indexBonus = Math.floor(Math.random() * bonus.length);
      indexIcon = Math.floor(Math.random() * icon.length);
      resultPlayers.push(addPlayerToList(bonus[indexBonus], RoleGameEnum.MARINS, icon[indexIcon]));
      bonus = bonus.filter(element => element !== bonus[indexBonus]);
      icon = icon.filter(element => element !== icon[indexIcon]);
    }


    resultPlayers.sort(() => Math.random() - 0.5);
    resultPlayers.forEach((element) => {
      element.position = index;
      index += 1;
    });
    setPlayers(resultPlayers);
  };

  const getNextCapitain = () => {
    if (capitain && capitain.position && capitain.position === players.length) {
      setCapitain(players[0]);
    } else {
      if (capitain && capitain.position) {
        const newCapitain = players.find((element) => element.position === capitain.position as number + 1);
        if (newCapitain) {
          setCapitain(newCapitain);
        }
      }
    }
  };

  const responseEquipeChooseByCapitain = (response: boolean) => {
    if (response) {
      changeView(StepEnum.VOTE_VOYAGE);
    } else {
      setEquipe([]);
      if (capitainCanMakeNewEquipe) {
        setCapitainCanMakeNewEquipe(false);
        changeView(StepEnum.EQUIPAGE);
        return;
      } else {
        getNextCapitain();
        changeView(StepEnum.CAPITAINE);
        setCapitainCanMakeNewEquipe(true);
      }
    }
  };

  const newGame = () => {
    setPlayers([]);
    setSelectedCapitain(undefined);
    setSelectedEquipe([]);
    setmaxManches(0);
    setTour(1);
    setScoreMarins(0);
    setScorePirates(0);
    setStep(StepEnum.INIT);
  };

  const addPlayerToList = (bonus: string, role: RoleGameEnum, icon: IconsPlayersEnum) => {
    return {
      role,
      bonus,
      icon
    };
  };


  return (
    <GameContext.Provider value={{
      tour,
      setName,
      initGame,
      changeView,
      maxWinningRound: maxManches,
      step,
      players,
      captain: capitain,
      setCaptain: setCapitain,
      timeToSee,
      team: equipe,
      setTeam: setEquipe,
      shippingActions: expeditionActions,
      setShippingActions: setExpeditionActions,
      setWinnerParty,
      scoreMarins,
      scorePirates,
      responseTeamChooseByCapitain: responseEquipeChooseByCapitain,
      captainCanMakeNewEquipe: capitainCanMakeNewEquipe,
      newGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context: GameContextType = useContext(GameContext);
  if (!context) {
    throw new Error('useCart doit être utilisé à l\'intérieur de CartProvider');
  }
  return context;
};