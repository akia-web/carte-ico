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
        className,
        width = 'w-[170px]',
        widthNumber = 170,
        heightNumber = 296,
        height =  'h-[296px]'
    }: FlippedCartProps
) {
  const [reveal, setReveal] = useState<boolean>(false)
    const flipCard = () =>{
        setReveal(!reveal)
        onClickAction()
    }

    return(

 <div className={`card-container ${width} ${height}  ${reveal ? 'flipped' : ''} ${className? className:'' }`}
        onClick={() => flipCard()}>
        <div className="card">
            <div className="card-front">
                <Image src={srcBack} width={widthNumber} height={heightNumber} alt="Dos de carte" />
            </div>
            <div className="card-back">
                <Image
                    src={srcFront}
                    width={widthNumber}
                    height={heightNumber}
                    alt={`Rôle ${selectedPlayer?.role}`}
                />
            </div>
        </div>
    </div>
    )
}