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
import { useEffect, useState } from 'react';

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
    <div>
      {maxManchesGagnantes > 0? (
        <div className='flex justify-between'>
          <div>
            <p>Tour: {tour}</p>
          </div>
          <div className='flex'>
            <p className='mr-2.5'>Score :</p>
            <p className='mr-2.5'>Marins: {scoreMarins}/{maxManchesGagnantes}</p>
            <p>Pirates: {scorePirates}/{maxManchesGagnantes}</p>
          </div>
        </div>
      ):('')}
      {renderComponentByStep()}
    </div>
  
  )
}