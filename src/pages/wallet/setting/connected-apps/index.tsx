import dynamic from "next/dynamic"

const ConnectedApps = dynamic(()=>import("@/components/Wallet/Setting/ConnectedApps"),{ssr:false})

export default function Connected(){
    return(
        <ConnectedApps/>
    )
}