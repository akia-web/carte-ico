'use client';
import { ToastContext } from '@/app/provider/toast.provider';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'primereact/button';

export default function AdminConfigForm() {
  const [config, setConfig] = useState({
    minPlayer: 0,
    maxPlayer: 0,
    minWinningRound: 0,
    maxWinningRound: 0,
    minTime: 0,
    maxTime: 0,
  });

  const [baseUrl, setBaseUrl] = useState<string>('');
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const { show } = useContext(ToastContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(config)
    show('Configuration', 'Mise à jour de la configuration réussite', 'success')
  }


  return (
    <div className="">
      <h1 className='text-2xl text-blueColor'>Configuration</h1>
      <form className='flex flex-col w-[80%] m-auto max-w-[500px]' onSubmit={handleSubmit}>
        <div className='flex flex-col mb-8'>
          <label>Joueur min</label>
          <input type='number'
                 className='border p-1.5 rounded-lg'

          />
        </div>

        <div className='flex flex-col mb-8'>
          <label>Joueur max</label>
          <input type='number'
                 className='border p-1.5 rounded-lg'

          />
        </div>

        <div className='flex flex-col mb-8'>
          <label>Minimum manches gagnantes</label>
          <input type='number'
                 className='border p-1.5 rounded-lg'

          />
        </div>
        <div className='flex flex-col mb-8'>
          <label>Max manches gagnantes</label>
          <input type='number '
                 className='border p-1.5 rounded-lg'

          />
        </div>

        <div className='flex flex-col mb-8'>
          <label>Temps minimum pour découvrir les pirates et sirènes </label>
          <input type='number'
                 className='border p-1.5 rounded-lg'

          />
        </div>

        <div className='flex flex-col'>
          <label>Temps maximum pour découvrir les pirates et sirènes </label>
          <input type='number'
                 className='border p-1.5 rounded-lg'
          />
        </div>
        <Button label='Enregistrer' className='mt-8 bg-goldenColor p-1.5 text-white' type={'submit'}></Button>
      </form>
    </div>
  );
}