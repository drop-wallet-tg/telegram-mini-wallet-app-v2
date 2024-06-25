import dynamic from "next/dynamic"

const CreateWalletv1 = dynamic(()=>import("@/components/Wallet/CreateWalletv1"),{ssr:false})

export default function CreateWalletPage(){
    return(
        <CreateWalletv1/>
    )
}