"use client";
import React, {Context, createContext, ReactNode, useContext, useState} from "react";
import {Sidebar} from "primereact/sidebar";
import { SidebarContextType } from "../interfaces/sidebar-context-type";
import Image from 'next/image'
import Link from "next/link";



export const SideBarContext: Context<SidebarContextType> = createContext<SidebarContextType>({
    toggleSideBar: (): void => {
    },
});

export const SideBarProvider = ({children}: { children: ReactNode }) => {
       
    const [visibility, setVisibility] = useState<boolean>(false);

    const toggleSideBar = (): void => {
        setVisibility((prev) => !prev);
    }

    return (
        <SideBarContext.Provider value={{toggleSideBar}}>
            <Sidebar visible={visibility}
                        position="right"
                        onHide={() => setVisibility(false)}
                        header={()=>{return ( <Image src="/logo2.svg" alt="" width={29} height={33} />)}}
                        closeIcon='pi pi-times-circle'
                        blockScroll={true}
                        className="relative bg-primaryBackgroundColor"
            >

            <div className="mt-8 ml-4">
                <Link href="/profile"
                onClick={()=>toggleSideBar()}>
                <span className="pi pi-user mr-4"></span>
                <span>Profil</span>
                </Link>
            </div>

            <div className="mt-8 ml-4">
                <Link href="/contact"
                onClick={()=>toggleSideBar()}>
                <span className="pi pi-envelope mr-4"></span>
                <span>Contact</span>
                </Link>
            </div>
            </Sidebar>
            {children}
        </SideBarContext.Provider>
    );
}


export const useSideBar = () => {
    const context: SidebarContextType = useContext(SideBarContext);
    if (!context) {
        throw new Error("useSideBar doit être utilisé à l'intérieur de SideBarProvider");
    }
    return context;
};