import { useSideBar } from '@/app/provider/side-bar.provider';
import Image from 'next/image';
import { Button } from 'primereact/button';
import Link from 'next/link';

export default function Header() {
  const { toggleSideBar } = useSideBar();
  return (
    <nav className="flex justify-between items-center p-2.5">
      <Link href="/">
        <Image src="/logo.svg" alt="" width={57} height={66}/>
      </Link>
      <Button icon="pi pi-bars text-white"
              onClick={toggleSideBar}/>
    </nav>
  );
}