import { useSideBar } from '@/app/provider/sideBar-provider';
import Image from 'next/image'
import { Button } from "primereact/button";

export default function Header() {
    const {toggleSideBar} = useSideBar()
    return(
        <nav className="flex justify-between items-center p-2.5">
            <Image src="/logo.svg" alt="" width={57} height={66} />
            <Button icon="pi pi-bars text-white" 
            onClick={toggleSideBar}/>
        </nav>
    )
}