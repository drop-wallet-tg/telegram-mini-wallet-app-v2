import dynamic from "next/dynamic"

const Mint = dynamic(()=>import("@/components/Wallet/NFT/MintNFT"),{ssr:false})

export default function MintPage(){
    return(
        <Mint/>
    )
}