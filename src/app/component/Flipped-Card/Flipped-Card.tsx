'use client';
import { FlippedCartProps } from '@/app/interfaces/flipped-cart-props';
import Image from 'next/image'
import {useState } from 'react';
export default function FlippedCart(
    {
        onClickAction,
        srcBack,
        srcFront,
        selectedPlayer,
        className
    }: FlippedCartProps
) {
  const [reveal, setReveal] = useState<boolean>(false)
    const flipCard = () =>{
        setReveal(!reveal)
        onClickAction()
    }

    return(
 <div className={`card-container ${reveal ? 'flipped' : ''} ${className? className:'' }`}
                                     onClick={() => flipCard()}>
                                     <div className="card">
                                         <div className="card-front">
                                             <Image src={srcBack} width={170} height={296} alt="Dos de carte" />
                                         </div>
                                         <div className="card-back">
                                             <Image
                                                 src={srcFront}
                                                 width={170}
                                                 height={296}
                                                 alt={`Rôle ${selectedPlayer?.role}`}
                                             />
                                         </div>
                                     </div>
                                 </div>
    )
}