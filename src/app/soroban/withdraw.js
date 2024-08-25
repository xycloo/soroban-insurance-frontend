"use client"

import { xdr, Contract, Address } from '@stellar/stellar-sdk'
import { useState } from "react";
import { useRouter } from 'next/navigation'
// import PoolsImage from "/public/pools-image-xycloans.png"
import Image from "next/image"
// import { getAssetId } from '@/helpers/aggregation';
import { publishTx } from './tx';


export default function Withdraw(props) {
    return (
        <div>
            <div className="flex justify-center mr-12">
                <p className="font-light text-xs my-auto ml-1">Express quantity in units, not stroops</p>
            </div>
        </div>
    )
}