import dynamic from "next/dynamic";

const Send = dynamic(()=>import("@/components/Wallet/NFT/View/Send"),{ssr:false})

export default function SendSingle(){
    return(
        <Send/>
    )
}