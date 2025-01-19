'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { getFetch, patchFetch } from '@/app/service/fetch-api';
import { UserDto } from '@/app/interfaces/user.dto';
import { ToastContext } from '@/app/provider/toast.provider';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useUser } from '@/app/provider/user.provider';
import { RulesDto } from '@/app/interfaces/rules.dto';
import RuleView from '@/app/component/rule-view/rule-view';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const GameRulesPage = () => {
  const { show } = useContext(ToastContext);
  const router: AppRouterInstance = useRouter();
  const { user, setConnectedUser, isConnected } = useUser();
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [tokenUser, setTokenUser] = useState<string | undefined>(undefined);
  const [rules, setRules] = useState<RulesDto[]>([]);
  const [orderHaveChange, setOrderHaveChange] = useState<boolean>(false);

  const ondragend = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;

    setRules((prevRules) => {
      const oldIndex = prevRules.findIndex((rule) => rule.id === active.id);
      const newIndex = prevRules.findIndex((rule) => rule.id === over?.id);
      const updatedRules = arrayMove(prevRules, oldIndex, newIndex).map((rule, index) => ({
        ...rule,
        order: index + 1,
      }));

      if(tokenUser){
        patchFetch(`${baseUrl}/api/rules`, tokenUser, updatedRules).then(()=> show('Liste des règles', 'Ordre modifié', 'success'))
      }

      return updatedRules
    });
  };

  useEffect(() => {
    console.log(rules);
  }, [rules]);

  useEffect(() => {
    if ((!user || !isConnected) && tokenUser) {
      console.log('pas de user');
      getUser(tokenUser);
    }
  }, [tokenUser]);

  useEffect(() => {
    setBaseUrl(window.location.origin);
    const token: string | null = localStorage.getItem('ico');
    if (!token) {
      show('Erreur', `Vous n'êtes pas connecté`, 'error');
      router.push('/login');
    } else {
      setTokenUser(token);
      getRules();
    }
  }, []);

  const getUser = async (token: string): Promise<void> => {
    const response: Response = await getFetch(`${baseUrl}/api/user`, token);
    const data: null | UserDto = await response.json();
    setConnectedUser(data);
    if (!data) {
      router.push('/login');
    }
    await getRules();
  };

  const getRules = async () => {
    if (tokenUser) {
      const response: Response = await getFetch(`${baseUrl}/api/rules`, tokenUser);
      const data: null | RulesDto[] = await response.json();
      if (data) {
        setRules(data);
      }
    }

  };

  const goToAdd = () => {
    router.push('/admin/rules/add');
  };


  return (

    <div className="w-[80%] m-auto">
      <div className="flex flex-row-reverse">
        <Button label="Ajouter"
                icon="pi pi-plus"
                className="mr-4 bg-goldenColor text-white p-1.5"
                onClick={() => goToAdd()}
        />
      </div>
      <div>
        <DndContext onDragEnd={ondragend} modifiers={[restrictToVerticalAxis]}>
          <SortableContext items={rules}>
            {rules.map((rule) => (
              <RuleView rule={rule}
                        key={rule.id}/>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default GameRulesPage;