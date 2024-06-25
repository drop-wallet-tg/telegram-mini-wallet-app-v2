import dynamic from "next/dynamic"

const MintSuccess = dynamic(()=>import("@/components/Wallet/NFT/MintNFTSuccess"),{ssr:false})

export default function MintSuccessPage(){
    return(
        <MintSuccess/>
    )
}