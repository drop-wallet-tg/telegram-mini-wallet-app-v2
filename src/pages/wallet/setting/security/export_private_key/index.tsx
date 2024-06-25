import dynamic from "next/dynamic"

const ExportPrivateKey = dynamic(()=>import("@/components/Wallet/Setting/Security/ExportPrivateKey"),{ssr:false})

export default function ExportPrivateKeyPage(){
    return(
        <ExportPrivateKey/>
    )
}