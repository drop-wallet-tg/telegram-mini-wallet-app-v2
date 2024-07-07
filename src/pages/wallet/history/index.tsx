import dynamic from "next/dynamic"

const History = dynamic(()=>import("@/components/Wallet/History"),{ssr:false})

const HistoryPage = () =>{
    return(
        <History/>
    )
}

export default HistoryPage;