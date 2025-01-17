'use client';

import { ToastProvider } from "@/app/provider/toastProvider";
import {usePathname} from "next/navigation";
import React from "react";
import Header from "../header/header";
import AdminMenu from "../AdminMenu/AdminMenu";
import { SideBarProvider } from "@/app/provider/sideBar-provider";

export default function LayoutWrapper({children}: { children: React.ReactNode }) {
    const pathname: string = usePathname();
    if (pathname.startsWith("/admin")) {
        return (<>
                <ToastProvider>
                    <AdminMenu></AdminMenu> <br />
                    {children}

                </ToastProvider>
            </>
        )
    }

    return (
        <>
            <ToastProvider>
            <SideBarProvider>
                <Header></Header>
               
                {children} 
            </SideBarProvider>
            </ToastProvider>
        </>
    );
}