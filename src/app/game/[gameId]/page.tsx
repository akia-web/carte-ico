"use client"

import Capitain from '@/app/component/Capitain/Capitain';
import ChooseName from '@/app/component/ChooseName/ChooseName';
import CloseEyes from '@/app/component/Close-eyes/Close-eyes';
import CreateGame from '@/app/component/CreateGame/CreateGame';
import Equipage from '@/app/component/Equipage/Equipage';
import FinalReveal from '@/app/component/FinalReveal/FinalReveal';
import PartyReveal from '@/app/component/Party-reveal/party-reveal';
import VoteEquipeChooseByCapitain from '@/app/component/VoteEquipeChooseByCapitain/VoteEquipeChooseByCapitain';
import Voyage from '@/app/component/Voyage/Voyage';
import { StepEnum } from '@/app/enum/stepEnum';
import { useGame } from '@/app/provider/game';
import Image from 'next/image'


export default function GameComponent() {
  const {step, maxManchesGagnantes, scoreMarins, scorePirates, tour} = useGame();

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
         return <VoteEquipeChooseByCapitain></VoteEquipeChooseByCapitain>
      case StepEnum.VOTE_VOYAGE:
        return <Voyage></Voyage>
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
      {maxManchesGagnantes > 0? (
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
            <p className="mr-2.5" >{scorePirates}/{maxManchesGagnantes}</p>
            <Image src="/icons/marin.svg" 
                    height={25} 
                    width={25}
                    className="mr-1.5" 
                    alt="image pirate"/>
            <p>{scoreMarins}/{maxManchesGagnantes}</p>
            </div>
          </div>
        </div>
      ):('')}
      {renderComponentByStep()}
    </div>
  
  )
}