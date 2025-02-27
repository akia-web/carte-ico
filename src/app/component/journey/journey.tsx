import { ActionCarteEnum } from '@/app/enum/action-carte.enum';
import { Player } from '@/app/interfaces/player.dto';
import { useGame } from '@/app/provider/game.provider';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from 'primereact/button';


export default function Journey() {
  const [index, setIndex] = useState<number>(0);
  const [affichePageTitle, setAffichePageTitle] = useState<boolean>(true);
  const { team, setShippingActions } = useGame();
  const [selectedMember, setSelectedMember] = useState<Player>(team[index]);
  const [selectedAction, setSelectedAction] = useState<{ action: ActionCarteEnum, order: number } | undefined>(undefined);
  const [allSelectedAction, setAllSelectedAction] = useState<(ActionCarteEnum)[]>([]);
  const [possibilityChoice, setPossibilityChoice] = useState<{ action: ActionCarteEnum, order: number }[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  useEffect(() => {
    if (index !== 0) {
      setSelectedMember(team[index]);
      setSelectedAction(undefined);
      setErrorMessage(false);
    }
  }, [index]);

  useEffect(() => {
    if (allSelectedAction.length > 0) {
      if (index === 2) {
        setShippingActions(allSelectedAction);
      } else {
        setIndex((prev) => prev + 1);
      }
    }

  }, [allSelectedAction]);

  useEffect(() => {
    const actions: { action: ActionCarteEnum, order: number }[] = [{ action: ActionCarteEnum.ILE, order: 1 }, { action: ActionCarteEnum.POISON, order: 2 }];
    actions.sort(() => Math.random() - 0.5);
    setPossibilityChoice(actions);
  }, [selectedMember]);

  const setAction = () => {
    if ((selectedMember.role === 'Marins' || selectedMember.role === 'Sirène') && selectedAction?.action === ActionCarteEnum.POISON) {
      setErrorMessage(true);
      return;
    }


    if (selectedAction) {
      setAllSelectedAction((prev) => [...prev, selectedAction.action]);
    }

  };

  return (
    <div>
      {affichePageTitle ? (
        <div className="flex flex-col items-center w-[80%] m-auto justify-center mt-8"
             onClick={() => setAffichePageTitle(false)}>
          <div className="bg-blueColor rounded-lg flex items-center">

            <Image src={`/icons/compass.svg`}
                   height={30}
                   width={30}
                   className="mr-2.5 ml-2.5"
                   alt="compas"/>

            <h1 className="text-base text-center text-white p-2.5"> L'équipage part en expedition</h1>
          </div>
          <div className="mb-8 flex mt-28">
            <Image src="/icons/ship.svg"
                   height={100}
                   width={100}
                   alt="illustration bateau"/>
            <Image src="/icons/island.svg"
                   height={100}
                   width={100}
                   alt="illustration ile"
            />
          </div>
          <span className="italic text-sm">Cliquez pour continuer</span>
        </div>
      ) : (
        <div className="flex flex-col items-center w-[80%] m-auto justify-center mt-8">
          <div className="bg-blueColor rounded-lg flex items-center">

            <Image src={`/icons/${selectedMember.icon}.svg`}
                   height={30}
                   width={30}
                   className="mr-2.5 ml-2.5"
                   alt="compas"/>

            <h1 className="text-base text-center text-white p-2.5"> {selectedMember.name} choisi une carte</h1>
          </div>

          <div className="flex mt-4">
            {possibilityChoice.map((element) => (
              <div key={element.order}
                   onClick={() => setSelectedAction(element)}>
                <Image src={`/cartes/Actions/${element.action}.svg`}
                       width={170}
                       height={296}
                       alt={`image carte ${element.action}`}
                       className={`${element.order === selectedAction?.order ? 'border border-goldenColor ' : ''}`}
                ></Image>
              </div>
            ))}

          </div>
          {errorMessage ? (<p className="text-redColor">Vous ne pouvez pas choisir cette carte</p>) : ('')}
          <Button label="Valider le choix"
                  disabled={selectedAction === undefined}
                  onClick={() => setAction()}
                  className="bg-goldenColor text-white p-1.5  w-[200px] mt-8"/>

        </div>
      )}
    </div>
  );
}