import dynamic from "next/dynamic";

const SendSuccess = dynamic(()=>import("@/components/Wallet/Send/SendSuccess"),{ssr:false})

export default function SendSuccessPage(){
    return(
        <SendSuccess/>
    )
}