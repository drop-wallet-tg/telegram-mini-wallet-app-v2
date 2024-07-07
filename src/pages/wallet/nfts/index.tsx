import dynamic from "next/dynamic";

const ShowNFT = dynamic(()=>import("@/components/Wallet/NFT"),{ssr:false})

const NFTS = () => {
    return(
        <ShowNFT/>
    )
}

export default NFTS;