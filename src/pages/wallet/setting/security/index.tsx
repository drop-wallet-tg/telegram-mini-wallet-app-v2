import dynamic from "next/dynamic"

const Security = dynamic(()=>import("@/components/Wallet/Setting/Security/Security"),{ssr:false})

export default function SecurityPage(){
    return(
        <Security/>
    )
}