import Link from "next/link";
import Image from 'next/image'

export default function Header() {
    return(
        <nav className="flex justify-between items-center">
            <Image src="/logo.png" alt="" width={89} height={51} />
            <div>
                <Link href="" className="mr-2.5">Règle du jeu</Link>
                <Link href="" className="mr-2.5">Contact</Link>
               
            </div>

        </nav>
    )
}