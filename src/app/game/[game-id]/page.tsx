"use client"

import Capitain from '@/app/component/capitain/Capitain';
import ChooseName from '@/app/component/choose-name/choose-name';
import CloseEyes from '@/app/component/close-eyes/close-eyes';
import CreateGame from '@/app/component/create-game/create-game';
import Equipage from '@/app/component/equipage/equipage';
import FinalReveal from '@/app/component/final-reveal/final-reveal';
import PartyReveal from '@/app/component/Party-reveal/party-reveal';
import VoteTeamChooseByCapitain from '@/app/component/vote-team-choose-by-capitain/vote-team-choose-by-capitain';
import Journey from '@/app/component/journey/journey';
import { StepEnum } from '@/app/enum/step.enum';
import { useGame } from '@/app/provider/game.provider';
import Image from 'next/image'


export default function GameComponent() {
  const {step, maxWinningRound, scoreMarins, scorePirates, tour} = useGame();

  const renderComponentByStep = () => {
    switch (step) {
      case StepEnum.INIT:
        return <CreateGame />;
      case StepEnum.CHOOSE_NAME:
        return <ChooseName></ChooseName>
      case StepEnum.CAPITAINE:
        return <Capitain></Capitain>
      case StepEnum.CLOSE_EYES:
        return <CloseEyes></CloseEyes>
      case StepEnum.EQUIPAGE:
        return <Equipage></Equipage>
        case StepEnum.VOTE_EQUIPAGE:
         return <VoteTeamChooseByCapitain></VoteTeamChooseByCapitain>
      case StepEnum.VOTE_VOYAGE:
        return <Journey></Journey>
      case StepEnum.PARTY_REVEAL:
        return <PartyReveal></PartyReveal>
      case StepEnum.FINAL_REVEAL:
      return <FinalReveal></FinalReveal>
      default:
        return <div>Invalid Step</div>;
    }
  }

  return(
    <div className={`${step  === StepEnum.INIT ? 'bg-transparent':'bg-white full-height'}`}>
      {maxWinningRound > 0? (
        <div className='md:w-[500px] m-auto'>
          <div className='pt-8 ml-2.5 flex'>
            <Image src="/icons/helm.svg" 
                    height={25} 
                    width={25}
                    className="mr-2.5" 
                    alt="image barre de navire"/>
            <p>Traversée : {tour} </p>
          </div>
        
          <div className='bg-bgScore border border-darkGrey rounded-md mr-2.5 ml-2.5 mt-2.5 py-1 px-4 flex justify-between'>
            <p>Score</p>
            <div className="flex items-center">
            <Image src="/icons/pirate.svg" 
                    height={25} 
                    width={25}
                    className="mr-1.5" 
                    alt="image pirate"/>
            <p className="mr-2.5" >{scorePirates}/{maxWinningRound}</p>
            <Image src="/icons/marin.svg" 
                    height={25} 
                    width={25}
                    className="mr-1.5" 
                    alt="image pirate"/>
            <p>{scoreMarins}/{maxWinningRound}</p>
            </div>
          </div>
        </div>
      ):('')}
      {renderComponentByStep()}
    </div>
  
  )
}