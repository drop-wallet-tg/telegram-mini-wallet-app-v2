import dynamic from "next/dynamic";

const SyncWallet = dynamic(()=>import("@/components/Sync"),{ssr:false})

const Sync = ()=>{
    return(
        <SyncWallet/>
    )
}

export default Sync;