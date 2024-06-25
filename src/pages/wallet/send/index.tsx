import dynamic from "next/dynamic"

const Send = dynamic(()=>import("@/components/Wallet/Send"),{ssr:false})

export default function SendPage(){
    return(
        <Send/>
    )
}