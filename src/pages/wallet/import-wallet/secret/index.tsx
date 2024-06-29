import dynamic from "next/dynamic"

const SecretPharse = dynamic(()=>import("@/components/Wallet/Import/SecretPharse"),{ssr:false})

export default function Secret(){
    return(
        <SecretPharse/>
    )
}