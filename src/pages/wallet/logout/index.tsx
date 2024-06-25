import dynamic from "next/dynamic";

const LogOut = dynamic(()=>import("@/components/Wallet/Logout"),{ssr:false})

export default function Logout(){
    return(
        <LogOut/>
    )
}