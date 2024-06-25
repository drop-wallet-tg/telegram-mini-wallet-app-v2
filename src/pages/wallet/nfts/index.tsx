import dynamic from "next/dynamic";

const ShowNFT = dynamic(()=>import("@/components/Wallet/NFT"),{ssr:false})

export default function NFTS(){
    return(
        <ShowNFT/>
    )
}