import dynamic from "next/dynamic"

const Setting = dynamic(()=>import("@/components/Wallet/Setting"),{ssr:false})

export default function SettingPage(){
    return(
        <Setting/>
    )
}