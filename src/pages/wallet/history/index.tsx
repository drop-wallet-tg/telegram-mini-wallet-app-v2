import dynamic from "next/dynamic"

const History = dynamic(()=>import("@/components/Wallet/History"),{ssr:false})

export default function HistoryPage(){
    return(
        <History/>
    )
}