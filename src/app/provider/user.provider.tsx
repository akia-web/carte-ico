"use client";

import React, { Context, createContext, MutableRefObject, ReactNode, useContext, useRef, useState } from 'react';

import {Toast} from 'primereact/toast';
import { ToastContextType } from '../interfaces/toast/toast-context-type';
import { UserContextType } from '@/app/interfaces/user-context-type';
import { UserDto } from '@/app/interfaces/user.dto';
import { GameContextType } from '@/app/interfaces/game-context-type';
import { GameContext } from '@/app/provider/game.provider';


export const UserContext: Context<UserContextType> = createContext<UserContextType>({
  setIsConnected: (): void => {
  },
  user: null,
  isConnected: false,
  setConnectedUser:(): void => {
  },
});

export const UserProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState<UserDto| null>(null)
  const [isConnected, setConnected] = useState<boolean>(false);

  const setIsConnected = (value: boolean) => {
    setConnected(value);
  }

  const setConnectedUser = (user: UserDto | null)=>{
    setUser(user)
    setIsConnected(!!user)
  }

  return (
    <UserContext.Provider value={{setConnectedUser,user, isConnected, setIsConnected}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context: UserContextType = useContext(UserContext);
  if (!context) {
    throw new Error("useUser doit être utilisé à l'intérieur de userProvider");
  }
  return context;
};