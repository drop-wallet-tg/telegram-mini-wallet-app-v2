import dynamic from "next/dynamic";

const SendNFTSuccess = dynamic(()=>import("@/components/Wallet/NFT/View/SendNFTSucces"),{ssr:false})

export default function SendNFTSuccessPage(){
    return(
        <SendNFTSuccess/>
    )
}