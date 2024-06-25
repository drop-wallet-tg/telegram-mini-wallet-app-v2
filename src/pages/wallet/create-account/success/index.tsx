"use client"
import dynamic from "next/dynamic"

const CreateWalletSucess = dynamic(()=>import("@/components/Wallet/CreateWalletSuccess"),{ssr:false})

export default function CreateWalletSucessPage(){
    return(
        <CreateWalletSucess/>
    )
}