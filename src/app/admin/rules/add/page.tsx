'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { useUser } from '@/app/provider/user.provider';
import { ToastContext } from '@/app/provider/toast.provider';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { getFetch, postFetch } from '@/app/service/fetch-api';
import { UserDto } from '@/app/interfaces/user.dto';

export default function Suggestion() {
  const { show } = useContext(ToastContext);
  const router: AppRouterInstance = useRouter();
  const { user, setConnectedUser, isConnected } = useUser();
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [tokenUser, setTokenUser] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState('');
  const [title, setTile] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);

    const token: string | null = localStorage.getItem('ico');
    if (!token) {
      show('Erreur', `Vous n'êtes pas connecté`, 'error');
      router.push('/login');
    } else {
      setTokenUser(token);
      if (!user || !isConnected) {
        getUser(token);
      }
    }
  }, []);

  const getUser = async (token: string): Promise<void> => {
    const response: Response = await getFetch(`${baseUrl}/api/user`, token);
    const data: null | UserDto = await response.json();
    setConnectedUser(data);
    if (!data) {
      router.push('/login');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(tokenUser){
      const body = {title, message}
      await postFetch(`${baseUrl}/api/admin/rules`, tokenUser, body)
        .then(() => {
          show('Règle', 'Règle rajouté à la liste', 'success')
          window.location.href='/admin/rules'
        } )
        .catch(()=> show('Erreur',  `Erreur lors de l'ajout des règles`, 'error'))
    }
  };


  return (

    <div>
      <form className="rules-container mx-auto max-w-4xl bg-white shadow-lg p-8 rounded-lg" onSubmit={handleSubmit}>
        <label>Titre section</label>
        <Editor value={title} onTextChange={(e) => setTile(e.htmlValue || '')} style={{ height: '50px' }}/>
        <div className="mt-4">
          <label>Contenu</label>
          <Editor value={message} onTextChange={(e) => setMessage(e.htmlValue || '')} style={{ height: '320px' }}/>
        </div>
        <Button label="Enregistrer"
                className="mt-4 bg-goldenColor text-white p-1.5"/>
      </form>
    </div>
  );
}