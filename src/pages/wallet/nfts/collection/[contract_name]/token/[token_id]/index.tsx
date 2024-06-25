"use client"
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const SendNFT = dynamic(()=>import("@/components/Wallet/NFT/View/SendNFT"),{ssr:false})

export default function SendToken(){
    const router = useRouter()
    const tokenId = router.query.token_id;
    return(
        <SendNFT tokenId={tokenId as string}/>
    )
}