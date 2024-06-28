import dynamic from "next/dynamic";

const ImportWallet = dynamic(()=>import("@/components/Wallet/Import/ImportWallet"),{ssr:false})

export default function PrivateKey(){
    return(
        <ImportWallet/>
    )
}