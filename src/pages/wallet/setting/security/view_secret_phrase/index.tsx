import dynamic from "next/dynamic"

const ViewSecretPhrase = dynamic(()=>import("@/components/Wallet/Setting/Security/ViewSecretPhrase"),{ssr:false})

export default function ViewSecretPhrasePage(){
    return(
        <ViewSecretPhrase/>
    )
}